'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import {type Action as EntitiesAction} from './entities';
import * as types from '../actions/groups/types';
import * as entitiesTypes from '../actions/entities/types';

// Case Functions

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type DispatchAction = Action | EntitiesAction;
type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<Action>) => any;

type Group = {
  +lastUpdated: string,
  +id: ?string,
  +name: ?string,
  +bio: ?string,
  +location: ?string,
  +website: ?string,
  +groupImage: ?string,
  +coverImage: ?string,
  +members: Array<string>,
  +playlists: Array<string>,
  +recentlyPlayed: Array<string>,
  +conversationID: ?string,
  +featuredID: ?string,
  +featuredType: ?string,
  +permissionJoin: ?string,
  +error: ?Error,
};

type Action = {
  +type?: string,
  +error?: Error,
  +bio?: string,
  +location?: string,
  +name?: string,
  +permission?: string,
  +websiteValid?: boolean,
  +website?: string,
  +updates?: State,
  +item?: Group,
  +refreshing?: boolean,
};

type State = {
  +lastUpdated?: string,
  +userGroups?: Array<string>,
  +totalUserGroups?: number,
  +selectedGroup?: ?string,
  +fetching?: Array<string>,
  +searching?: boolean,
  +websiteValid?: boolean,
  +error?: ?Error,
  +newGroup?: {
    +members?: Array<string>,
    +name?: string,
    +bio?: string,
    +location?: string,
    +website?: string,
    +image?: string,
    +join?: string,
  },
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Group,
  Action,
  State,
};

/**
 * @constant
 * @type {object}
 * 
 * @property {string}   lastUpdated         The date/time the single group was last updated
 * @property {string}   id=null             The Brassroots id of a single group
 * @property {string}   name=null           The name of a single group
 * @property {string}   bio=null            The bio of a single group
 * @property {string}   location=null       The location of a single group
 * @property {string}   website=null        The website of a single group
 * @property {string}   groupImage=null     The group image url of a single group
 * @property {string}   coverImage=null     The cover image url of a single group
 * @property {string[]} members=[]          The Brassroots ids of the members of a single group
 * @property {string[]} playlists=[]        The Spotify ids of the playlists of a single group
 * @property {string[]} recentlyPlayed=[]   The Spotify ids of the recently played tracks of a single group
 * @property {string}   conversationID=null The Brassroots id of the group conversation
 * @property {string}   featuredID=null     The Spotify id of the featured item of a single group
 * @property {string}   featuredType=null   The type of item featured on a single group
 * @property {string}   permissionJoin=null The join permission status of a single group
 * @property {Error}    error=null          The error related to single group actions
 */
const singleState: Group = {
  lastUpdated,
  id: null,
  name: null,
  bio: null,
  location: null,
  website: null,
  groupImage: null,
  coverImage: null,
  members: [],
  playlists: [],
  recentlyPlayed: [],
  conversationID: null,
  featuredID: null,
  featuredType: null,
  permissionJoin: null,
  error: null,
};

/**
 * @constant
 * @alias groupsState
 * @type {object}
 * 
 * @property {string}   lastUpdated           The date/time the groups were last updated
 * @property {string[]} userGroups            The Brassroots ids of the groups the current user is a member of
 * @property {number}   totalUserGroups=0     The total amount of user groups
 * @property {string}   selectedGroup=null    The selected group to view
 * @property {boolean}  fetching=[]  Whether the current user is fetching any entity type
 * @property {boolean}  searching=false Whether the current user is searching groups
 * @property {boolean}  websiteValid=true     Whether the group website the current user has entered is a valid URL
 * @property {Error}    error=null            The error related to groups actions
 * @property {object}   newGroup              The new group the current user is creating
 * @property {string[]} newGroup.members      The Brassroots ids of the members to create the group with
 * @property {string}   newGroup.name         The name of the new group
 * @property {string}   newGroup.bio          The bio of the new group
 * @property {string}   newGroup.location     The location of the new group
 * @property {string}   newGroup.website      The website of the new group
 * @property {string}   newGroup.image        The image url of the new group
 * @property {string}   newGroup.join         The join permission status for the new group
 */
export const initialState: State = {
  lastUpdated,
  userGroups: [],
  totalUserGroups: 0,
  selectedGroup: null,
  fetching: [],
  searching: false,
  websiteValid: true,
  error: null,
  newGroup: {
    members: [],
    name: '',
    bio: '',
    location: '',
    website: '',
    image: '',
    join: '',
  },
};

/**
 * Adds or updates a single group
 * 
 * @function addOrUpdateGroup
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {object} action.item The group object to add or update
 * 
 * @returns {object}             The single group added or updated with the new information
 */
function addOrUpdateGroup(
  state: Group,
  action: Action,
): Group {
  const {members, playlists, recentlyPlayed} = state;
  const {item, refreshing} = action;
  const updates: Group = (
    item
    && Array.isArray(members)
    && Array.isArray(playlists)
    && Array.isArray(recentlyPlayed)
  )
    ? {
      ...item,
      lastUpdated,
      members: item.members && refreshing
        ? [...item.members]
        : item.members
        ? [...members, ...item.members]
        : [...members],
      playlists: item.playlists && refreshing
        ? [...item.playlists]
        : item.playlists
        ? [...playlists, ...item.playlists]
        : [...playlists],
      recentlyPlayed: item.recentlyPlayed && refreshing
        ? [...item.recentlyPlayed]
        : item.recentlyPlayed
        ? [...recentlyPlayed, ...item.recentlyPlayed]
        : [...recentlyPlayed],
    }
    : {};

  return updateObject(state, updates);
}

export function group(
  state: Group = singleState,
  action: Action,
): Group {
  switch (action.type) {
    case entitiesTypes.ADD_ENTITIES:
      return addOrUpdateGroup(state, action);
    default:
      return state;
  }
}

/**
 * Updates any of the values in the groups state
 * 
 * @function update
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {object} action.updates The updates to make to the state
 * 
 * @returns {object}                The state updated with the new information
 */
function update(
  state: State,
  action: Action,
): State {
  const {newGroup: oldGroup} = state;
  const updates: State = oldGroup && action.updates
    ? {
      ...action.updates,
      newGroup: action.updates.newGroup
        ? updateObject(oldGroup, action.updates.newGroup)
        : {...oldGroup},
    }
    : {};

  return updateObject(state, updates);
}

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.UPDATE_GROUPS:
        return update(state, action);
      default:
        return state;
    }
  }

  return state;
}