'use strict';

/**
 * @module GetUnique
 */

/**
 * Removes duplicate objects from an array based off a key
 * 
 * @function getUnique
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object[]} arr  The array to remove duplicates from
 * @param   {string}   comp The key to filter the objects by
 * 
 * @returns {object}        The array with the unique objects
 */
function getUnique(arr, comp) {
  const unique = arr.map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
}

module.exports = getUnique;