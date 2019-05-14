'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/groups/types';

// Case Functions
import {setNewGroupBio} from '../actions/groups/SetNewGroupBio/reducers';
import {setNewGroupLocation} from '../actions/groups/SetNewGroupLocation/reducers';
import {setNewGroupName} from '../actions/groups/SetNewGroupName/reducers';
import {setNewGroupPermissions} from '../actions/groups/SetNewGroupPermissions/reducers';
import {setNewGroupWebsite} from '../actions/groups/SetNewGroupWebsite/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

export type Group = {
  +lastUpdated: string,
  +id: ?string,
  +name: ?string,
  +bio: ?string,
  +location: ?string,
  +website: ?string,
  +groupImage: ?string,
  +coverImage: ?string,
  +members: Array<string>,
  +fetchingMembers: boolean,
  +playlists: Array<string>,
  +fetchingPlaylists: boolean,
  +recentlyPlayed: Array<string>,
  +fetchingRecent: boolean,
  +conversationID: ?string,
  +featuredID: ?string,
  +featuredType: ?string,
  +permissionJoin: ?string,
  +error: ?Error,
};

export type Action = {
  +type?: string,
  +error?: Error,
  +bio?: string,
  +location?: string,
  +name?: string,
  +permission?: string,
  +websiteValid?: boolean,
  +website?: string,
};

export type State = {
  +lastUpdated: string,
  +userGroups: Array<string>,
  +groupsByID: {+[key: string]: Group},
  +totalGroups: number,
  +selectedGroup: ?string,
  +fetchingGroups: boolean,
  +searchingGroups: boolean,
  +websiteValid?: boolean,
  +error: ?Error,
  +newGroup: {
    +members: Array<string>,
    +name: string,
    +bio: string,
    +location: string,
    +website: string,
    +image: string,
    +join: string,
  },
};

/**
 * @constant
 * @type {object}
 * 
 * @property {string}   lastUpdated             The date/time the single group was last updated
 * @property {string}   id=null                 The Brassroots id of a single group
 * @property {string}   name=null               The name of a single group
 * @property {string}   bio=null                The bio of a single group
 * @property {string}   location=null           The location of a single group
 * @property {string}   website=null            The website of a single group
 * @property {string}   groupImage=null         The group image url of a single group
 * @property {string}   coverImage=null         The cover image url of a single group
 * @property {string[]} members                 The Brassroots ids of the members of a single group
 * @property {boolean}  fetchingMembers=false   Whether the current user is fetching members of a single group
 * @property {string[]} playlists               The Spotify ids of the playlists of a single group
 * @property {boolean}  fetchingPlaylists=false Whether the current user is fetching playlists of a single group
 * @property {string[]} recentlyPlayed          The Spotify ids of the recently played tracks of a single group
 * @property {boolean}  fetchingRecent=false    Whether the current user is fetching recent tracks of a single group
 * @property {string}   conversationID=null     The Brassroots id of the group conversation
 * @property {string}   featuredID=null         The Spotify id of the featured item of a single group
 * @property {string}   featuredType=null       The type of item featured on a single group
 * @property {string}   permissionJoin=null     The join permission status of a single group
 * @property {Error}    error=null              The error related to single group actions
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
  fetchingMembers: false,
  playlists: [],
  fetchingPlaylists: false,
  recentlyPlayed: [],
  fetchingRecent: false,
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
 * @property {object}   groupsByID            The group objects with the Brassroots ids as the key
 * @property {number}   totalGroups=0         The total amount of groups
 * @property {string}   selectedGroup=null    The selected group to view
 * @property {boolean}  fetchingGroups=false  Whether the current user is fetching groups
 * @property {boolean}  searchingGroups=false Whether the current user is searching groups
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
  groupsByID: {},
  totalGroups: 0,
  selectedGroup: null,
  fetchingGroups: false,
  searchingGroups: false,
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

function singleGroup(
  state: Group = singleState,
  action: Action,
): Group {
  switch (action.type) {
    default:
      return state;
  }
}

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.SET_NEW_GROUP_BIO:
        return setNewGroupBio(state, action);
      case types.SET_NEW_GROUP_LOCATION:
        return setNewGroupLocation(state, action);
      case types.SET_NEW_GROUP_NAME:
        return setNewGroupName(state, action);
      case types.SET_NEW_GROUP_PERMISSIONS:
        return setNewGroupPermissions(state, action);
      case types.SET_NEW_GROUP_WEBSITE:
        return setNewGroupWebsite(state, action);
      default:
        return state;
    }
  }

  return state;
}