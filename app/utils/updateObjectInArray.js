'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateObjectInArray
 */

/**
 * A callback to update an object in an array
 * 
 * @callback updateCallback
 * @param   {object} item The object in the array to update
 * 
 * @returns {object}      The updated object with the new values
 */

/**
 * Updates a specific item in an array
 * 
 * @function updateObjectInArray
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param {object[]}       array  The array of objects
 * @param {string}         itemID The id of the item to update
 * @param {updateCallback} update The callback which handles the update
 * 
 * @returns {object[]}            The array with the specific object updated
 */
function updateObjectInArray(
  array: [],
  itemID: string,
  update: (item: {}) => {},
) {
  const updatedItems: (?{})[] = array.map((item) => {
    if (item.id !== itemID) return item;
    const updatedItem: {} = update(item);
    return updatedItem;
  });

  return updatedItems;
}

export default updateObjectInArray;