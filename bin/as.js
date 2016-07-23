const _ = require('lodash');

var K = function (k) {
  console.log('K Connstructor');
  this.k = k;
};
K.prototype.foo = function () {
  console.log('Foo!');
};

var R = function (r) {
  console.log('R Connstructor');
  this.r = r;
};
R.prototype.bar = function () {
  console.log('Bar!');
};

var k = new K();
var r = new R();
k.foo();
r.bar();

_.merge(K, R);

var e = new K();

e.foo();
e.bar();