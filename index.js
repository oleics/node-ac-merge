
var isArray = require('ac-is-array');
var isScalar = require('is-scalar');
var clone = require('ac-clone');
var _argsSlice = Array.prototype.slice;

module.exports = merge;

// concats array-values
// replaces non-array values (left to right..)
// replaces circular-refs with '[*circular]'

function merge() {
  var args = _argsSlice.call(arguments, 0);
  var i, len = args.length;
  var objRes = clone(args[0]);

  for(i=1; i<len; i++) {
    objRes = _merge(objRes, args[i]);
  }

  return objRes;
}

function _merge(objA, objB) {
  var objRes;
  var key, valueB, valueA;

  if(isArray(objA)) {
    if(isArray(objB)) {
      objRes = objA.concat(objB);
    } else {
      objRes = clone(objB);
    }
  } else if(isScalar(objA) || isScalar(objB)) {
    objRes = clone(objB);
  } else {
    objRes = clone(objA);
    for(key in objB) {
      if(objB.hasOwnProperty(key)) {
        valueB = objB[key];
        if(isScalar(valueB)) {
          objRes[key] = valueB;
        } else {
          valueA = objA[key];
          if(isScalar(valueA)) {
            objRes[key] = clone(valueB);
          } else {
            objRes[key] = _merge(valueA, valueB);
          }
        }
      }
    }
  }

  return objRes;
}
