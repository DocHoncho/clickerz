var fs = require('fs');
const _ = require('lodash');

var raw_data = fs.readFileSync('data/names.txt', 'utf8')
                 .split('\n');

var new_data = {
  male: [],
  female: [],
  last: []
};

const decode_line = (a, b) => {
  return {
    male: !!(a === 'MO' || a === 'MF'),
    female: !!(a === 'FO' || a === 'MF'),
    last: (b === 'LY')
  };
};

_.each(raw_data, (line) => {
  var parts = line.split(' ');
  var name = parts[2].slice(0, 1) + parts[2].slice(1).toLowerCase()
  var atts = decode_line(parts[0], parts[1]);
  if (atts.male) {
    new_data.male.push(name);
  }
  if (atts.female) {
    new_data.female.push(name);
  }
  if (atts.last) {
    new_data.last.push(name);
  }
});

_.sortBy(new_data.male);
_.sortBy(new_data.female);
_.sortBy(new_data.last);

fs.writeFileSync('data/names.json', JSON.stringify(new_data));
console.log(`Male: ${new_data.male.length} Female: ${new_data.female.length} Last: ${new_data.last.length}`);