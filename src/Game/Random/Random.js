const _ = require('lodash');
const RandomJS = require('random-js');

var MakeRandom = function (seed, engine) {
  if (_.isEmpty(engine)) {
    engine = RandomJS.engines.mt19937();
  }

  if (!_.isEmpty(seed)) {
    engine.autoseed();
  }
  else {
    engine.seed(seed);
  }

  return new RandomJS(engine);
};

var Random = MakeRandom();

module.exports = {
  Random: Random,
  MakeRandom: MakeRandom
};
