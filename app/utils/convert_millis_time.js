'use strict';

/**
 * @module ConvertMillisTime
 */

/**
 * Converts milliseconds to readable minutes and seconds format
 * 
 * @param  {number} millis The number of milliseconds to convert
 * 
 * @return {string}        The converted milliseconds in minutes and seconds
 */
function convertMillisTime(millis) {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);

  return (seconds == 60 ? (minutes + 1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
};

module.exports = convertMillisTime;