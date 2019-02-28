'use strict';

/**
 * @module GetLocation
 */

/**
 * A function that promisifies the getCurrentPosition method from navigator
 * 
 * @returns {Promise}
 * @resolves {object} The pos object containing the coordinates
 * @rejects  {Error}  The error which caused the promise to fail
 */
function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

module.exports = getLocation;