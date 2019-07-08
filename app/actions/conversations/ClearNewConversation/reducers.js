'use strict';

import updateObject from '../../../utils/updateObject';
import {
  initialState,
  type State,
} from '../../../reducers/conversations';

/**
 * Clears the new conversation
 * 
 * @function clearNewConversation
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the new conversation cleared
 */
export function clearNewConversation(
  state: State,
): State {
  const {newConversation} = initialState;
  return updateObject(state, {newConversation, isCreating: false});
}