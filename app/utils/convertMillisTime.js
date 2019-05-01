'use strict';

/**
 * @format
 * @flow
 */

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
function convertMillisTime(millis: number): string {
  const min: number = Math.floor(millis / 60000);
  const sec: number = parseInt(((millis % 60000) / 1000).toFixed(0));
  const formattedMin: number = sec === 60 ? min + 1 : min;
  const formattedSec: string | number = sec === 60 ? '00' : sec < 10 ? `0${sec}` : sec;
  return `${formattedMin}:${formattedSec}`;
}

module.exports = convertMillisTime;