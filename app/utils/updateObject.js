'use strict';


/**
 * @module UpdateObject
 */

/**
 * Updates an object with new values
 * 
 * @function updateObject
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} oldObject The object to update with new values
 * @param   {object} newValues The new values to update the old object with
 * 
 * @returns {object}           The newly updated object containing the new values
 */
function updateObject(oldObject, newValues) {
  return {...oldObject, ...newValues};
}

export default updateObject;