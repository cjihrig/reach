'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = reach;

var defaults = {
  separator: '.',
  strict: false,
  default: undefined
};

function reach(obj, chain, options) {
  if (typeof chain !== 'string') {
    throw new TypeError('Reach path must a string. Found ' + chain + '.');
  }

  var settings = Object.assign({}, defaults, options);
  var path = chain.split(settings.separator);
  var ref = obj;

  for (var i = 0; i < path.length; ++i) {
    var key = path[i];

    if (key[0] === '-' && Array.isArray(ref)) {
      key = key.slice(1, key.length);
      key = ref.length - key;
    }

    // ref must be an object or function and contain key
    if (ref === null || (typeof ref === 'undefined' ? 'undefined' : _typeof(ref)) !== 'object' && typeof ref !== 'function' || !(key in ref)) {
      if (settings.strict) {
        throw new Error('Invalid segment, ' + key + ', in reach path ' + chain + '.');
      }

      return settings.default;
    }

    ref = ref[key];
  }

  return ref;
}