var Random = require('./Random');

/**
 * Implements a weighted pool where items have a specified chance of being chosen.
 * 
 * Pool may be initialized with a list of tuples, [callback, chance] where chance is a number between 0 and 1
 * which is interpreted as an n in m chance of occuring.
 * Set chance to null to let that item's chance be set according to the chances of other items in the pool.
 * Any space left from items added to the pool with specific chances is divided equally to all items with a null chance.
 * 
 * Adding new auto chance items **will** change the chances of the rest of the auto items.
 *
 * @constructor
 * @param {Array} pool - Array of 2-tuples to initialize pool, [callback, chance]
 */
var WeightedPool = function (pool) {
  this.pool = [];
  _.each(pool, (obj) => {this.addItem(obj, false)});
  });

  this.updatePool();
}

/**
 * Pick a random item from the pool
 *
 * @return {Function} pool entry object
 */
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

/**
 * Update pool items, setting chance on all auto chance items.
 *
 */
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

/** 
 * Add item to pool.
 *
 * @param {Function} callback - Callback to be called if pool item is chosen.
 * @param {Number} chance - Number between 0 and 1 denoting chance pool item may be chosen
 * @param {Boolean} updatePool - Set to false to suppress updating the pool (must updatePool manually!)
 */
WeightedPool.prototype.addItem = function (obj, updatePool=true) {
  let item =_.assign({
    callback: null,
    baseChance: null,
    chance: null,
    range: {
      high: null,
      low: null
    }
  }, obj);
  
  if (!_.isEmpty(chance)) {
    item.baseChance = chance;
  }

  this.pool.push(item);

  if (updatePool) {
    this.updatePool();    
  }
}

/**
 * Add multiple items to pool.
 *
 * @param {Array] items - Array of {callback: x, chance: y} entries
 */
WeightedPool.prototype.addItems = function (items) {
  _.each(items, (i) => {
    this.addItem(i, false);
  });

  this.updatePool();
}

/**
 * Return number of items in pool
 *
 * @return {Number} number of items in pool
 */
WeightedPool.prototype.size = function () {
  return this.pool.length;
}

module.exports = WeightedPool;
