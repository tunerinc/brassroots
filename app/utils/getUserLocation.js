'use strict';

/**
 * @module GetUserLocation
 */

/**
 * A function that promisifies the getCurrentPosition method from navigator
 * 
 * @returns {Promise}
 * @resolves {object} The pos object containing the user's coordinates
 * @rejects  {Error}  The error which caused the promise to fail
 */
function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

module.exports = getUserLocation;