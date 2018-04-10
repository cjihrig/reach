'use strict';

module.exports = reach;


function reach (obj, chain, options) {
  if (typeof chain !== 'string') {
    throw new TypeError('Reach path must a string. Found ' + chain + '.');
  }

  var settings = options || {};

  settings.separator = settings.separator !== undefined ? settings.separator : '.';
  settings.strict = settings.strict !== undefined ? settings.strict : false;

  var path = chain.split(settings.separator);
  var ref = obj;

  for (var i = 0; i < path.length; ++i) {
    var key = path[i];

    if (key[0] === '-' && Array.isArray(ref)) {
      key = key.slice(1, key.length);
      key = ref.length - key;
    }

    // ref must be an object or function and contain key
    if (ref === null ||
        (typeof ref !== 'object' && typeof ref !== 'function') ||
        !(key in ref)) {
      if (settings.strict) {
        throw new Error('Invalid segment, ' + key + ', in reach path ' + chain + '.');
      }

      return settings.default;
    }

    ref = ref[key];
  }

  return ref;
}
