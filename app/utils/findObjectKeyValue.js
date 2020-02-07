'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module FindObjectValueKey
 */

type Value = string | number | {};
type Obj = {+[key: string]: Value};

/**
 * Finds the key of a value if it exists in an object
 * @function findObjectKeyValue
 *
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {object} obj   The object to search a value within
 * @param   {string} value The value to search the object for
 *
 * @returns {string}       The key of the value if the value exists within the object
 */
function findObjectValueKey(obj: Obj, value: Value) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === value) return key;
  }

  return null;
}

module.exports = findObjectValueKey;