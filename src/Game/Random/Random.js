const _ = require('lodash');
const randomjs = require('random-js');

var MakeRandom = function (seed, engine) {
  if (_.isEmpty(engine)) {
    engine = randomjs.engines.mt19937();
  }

  if (!_.isEmpty(seed)) {
    engine.autoseed();
  }
  else {
    engine.seed(seed);
  }

  return new randomjs(engine);
}

var Random = MakeRandom();

var WeightedPool = function (pool) {
  this.pool = [];
  _.each(pool, (obj) => {
    this.pool.push({
      callback: obj[0],
      baseChance: (obj.length > 1) ? obj[1] : null,
      chance: null,
      range: {
        high: null,
        low: null
      }
    });
  });

  this.updatePool();
}

WeightedPool.prototype.choose = function () {
  var t = Random.integer(0, 100) / 100;
  for (var i = 0; i < this.pool.length; i++) {
    var p = this.pool[i];
    if (t >= p.range.low && t <= p.range.high) {
      return p;
    }
  }

  return "Something really shitty happened"
}

WeightedPool.prototype.updatePool = function () {
  var total = 0;
  var fill_items = [];

  // Scan through pool, picking out fill items and 
  // adding up total of specified chances
  _.each(this.pool, (value, idx, rest) => {
    if (!value.baseChance) {
      fill_items.push(value);
    }
    else {
      value.chance = value.baseChance;
      value.range = {
        low: total,
        high: total + value.chance
      }
      total += value.baseChance;
    }

  });

  // Take what's left over, divided it up equally among fill items
  var left = 1 - total;
  var fill = left / fill_items.length;
  _.each(fill_items, (value, idx, rest) => {
    value.chance = fill;
    value.range = {
      low: total,
      high: total + fill
    }

    total += fill;
  });
  
  this.pool = _.sortBy(this.pool, (i) => {
    return i.range.high;
  });
}

WeightedPool.prototype.addItem = function (callback, chance, updatePool=true) {
  var item = {
    callback: callback
  }
  if (!_.isEmpty(chance)) {
    item.chance = chance;
  }
  this.pool.push(item);

  if (updatePool) {
    this.updatePool();    
  }
}

WeightedPool.prototype.addItems = function (items) {
  _.each(items, (i) => {
    this.addItem(i.callback)
  });
}

var m = new WeightedPool([
  [(p) => { console.log('fill1', p) }, null],
  [(p) => { console.log('fill2', p) }, null],
  [(p) => { console.log('1/100', p) }, 1.0/100],
  [(p) => { console.log('1/3', p) }, 1.0/3]
  ]);

module.exports = {
  Random: Random,
  MakeRandom: MakeRandom,
  WeightedPool: WeightedPool
}