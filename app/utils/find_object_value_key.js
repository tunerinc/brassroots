'use strict';

/**
 * @module FindObjectValueKey
 */

/**
 * Finds the key of a value if it exists in an object
 *
 * @param   {object} obj   The object to search a value within
 * @param   {string} value The value to search the object for
 *
 * @returns {string}       The key of the value if the value exists within the object
 */
function findObjectValueKey(obj, value) {
  for (let key in obj) {
    if (o.hasOwnProperty(key) && o[key] === value) {
      return key;
    };
  };

  return null;
};

module.exports = findObjectValueKey;