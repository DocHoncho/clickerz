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

module.exports = {
  Random: Random,
  MakeRandom: MakeRandom,
}
