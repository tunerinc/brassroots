'use strict';

/**
 * @module CalculateDistance
 */

/**
 * Calculates the distance between two coordinate points
 *
 * @param   {number} lat1 The latitude value of the first set of coordinates
 * @param   {number} lon1 The longitude value of the first set of coordinates
 * @param   {number} lat2 The latitude value of the second set of coordinates
 * @param   {number} lon2 The longitude value of the second set of coordinates
 * @param   {string} unit The desired unit of measurement for the result, default: M
 *
 * @returns {number}      The distance between the two coordinates given in the desired unit of measurement
 */
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
  let radlat1 = Math.PI * lat1/180;
  let radlat2 = Math.PI * lat2/180;
  let theta = lon1-lon2;
  let radtheta = Math.PI * theta/180;
  let distance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  distance = Math.acos(distance);
  distance = distance * 180/Math.PI;
  distance = distance * 60 * 1.1515;

  if (unit == 'K') { distance = distance * 1.609344 };
  if (unit == 'N') { distance = distance * 0.8684 };

  return distance;
};

module.exports = calculateDistance;
