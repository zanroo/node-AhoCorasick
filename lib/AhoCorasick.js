var createTrie = require("array-trie");
var createAC = require("aho-corasick-automaton");

var ac = module.exports = function() {
  this._tree = createTrie();
};

/**
 * add a string as a pattern * @param string
 */
ac.prototype.add = function(object) {
  var len = object.value.length;
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(object.value.charCodeAt(i));
  }
  let exists = this._tree.get(arr);
  if (exists) {
    exists = exists.concat(object);
    this._tree.set(arr, exists);
  } else {
    this._tree.set(arr, [object]);
  }
};

/**
 * build the aho-corasick-automaton
 */
ac.prototype.build = function() {
  this._root = createAC(this._tree);
};

/**
 * match the patterns
 * @param {String} string
 * @returns {String[]}
 */
ac.prototype.search = function(string) {
  if (!this._root)
    throw Error("please build before search");
  var data = string.split('').map(function(it) {
    return it.charCodeAt(0);
  });
  var resList = [];
  for (var state = this._root, i = 0; i < data.length; i++) {
    state = state.push(data[i]);
    if (state.value) {
      var b = i + 1;
      for (var cur = state; cur.value; cur = cur.next) {
        for (var j = 0; j < cur.value.length; j++) {
          var v = cur.value[j];
          var a = i - v.value.length + 1;
          resList.push({
            o: v.o,
            a,
            b
          });
        }
      }
    }
  }
  return resList;
};
