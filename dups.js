
var merge = require('./index');

module.exports = mergeDups;

function mergeDups(arr, key) {
  if(key == null) key = 'id';
  var idxs = {};
  var i, len = arr.length, item, value, index;
  for(i=0; i<len; i++) {
    item = arr[i];
    value = item[key];
    index = idxs[value];
    if(index == null) {
      idxs[value] = i;
    } else {
      arr[index] = merge(arr[index], arr.splice(i, 1)[0]);
      --len;
    }
  }
  return arr;
}
