'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/users/types';
import * as entitiesTypes from '../actions/entities/types';
import * as onboardingTypes from '../actions/onboarding/types';
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';
import {type Action as OnboardingAction} from './onboarding';
import {type Action as EntitiesAction} from './entities';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type DispatchAction = Action | OnboardingAction | EntitiesAction;
type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<Action>) => any;

type User = {
  +lastUpdated?: string,
  +id?: ?string,
  +displayName?: ?string,
  +profileImage?: ?string,
  +coverImage?: ?string,
  +bio?: ?string,
  +location?: ?string,
  +website?: ?string,
  +spotifyAccountStatus?: ?string,
  +coords?: ?{
    +lat: number,
    +lon: number,
  },
  +currentSessionID?: ?string,
  +favoriteTrackID?: ?string,
  +topPlaylists?: Array<string>,
  +recentlyPlayed?: Array<string>,
  +mostPlayed?: Array<string>,
  +followers?: Array<string>,
  +totalFollowers?: number,
  +following?: Array<string>,
  +totalFollowing?: number,
};

type Action = {
  +type?: string,
  +error?: Error,
  +photo?: ?string,
  +favoriteTrackID?: string,
  +mostPlayed?: Array<string>,
  +recentlyPlayed?: Array<string>,
  +topPlaylists?: Array<string>,
  +users?: {+[id: string]: User},
  +userID?: string,
  +currentUserID?: string,
  +trackID?: string,
  +index?: number,
  +updates?: State,
  +item?: User,
  +refreshing?: boolean,
  +location?: {
    latitude: number,
    longitude: number,
  },
  +user?:
    | User
    | {
      +id: string,
      +bio?: string,
      +location?: string,
      +website?: string,
    },
};

type State = {
  +lastUpdated?: string,
  +currentUserID?: ?string,
  +searching?: Array<string>,
  +fetching?: Array<string>,
  +saving?: boolean,
  +changingImage?: ?string,
  +error?: ?Error | SpotifyError,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  User,
  Action,
  State,
};

/**
 * @constant
 * @alias singleUserState
 * @type {object}
 *
 * @property {string}   lastUpdated               The date/time the user's information was last updated
 * @property {string}   id=null                   The Spotify id of the user
 * @property {string}   displayName=null          The Spotify display name of the user
 * @property {string}   profileImage=null         The user's profile image url
 * @property {string}   coverImage=null           The user's cover image url
 * @property {string}   bio=null                  The bio of the user
 * @property {string}   location=null             The location the user has set
 * @property {string}   website=null              The website the user has set
 * @property {string}   spotifyAccountStatus=null The account status of the Spotify user
 * @property {object}   [coords=null]             The coordinates of the user, only applicable if the current user.
 * @property {number}   coords.lat                The latitude value of the user's coordinates
 * @property {number}   coords.lon                The longitude value of the user's coordinates
 * @property {string}   currentSessionID=null     The Brassroots id of the session the user is in
 * @property {string}   favoriteTrackID=null      The Spotify id of the user's favorite track
 * @property {string[]} topPlaylists              The Spotify ids of the user's top playlists they play
 * @property {string[]} recentlyPlayed            The Spotify ids of the tracks the user has recently played
 * @property {string[]} mostPlayed                The Spotify ids of the tracks the user has played the most
 * @property {string[]} followers                 The Brassroots ids of the followers of the user
 * @property {number}   totalFollowers=0          The total amount of followers the user has
 * @property {string[]} following                 The Brassroots ids of the following of the user
 * @property {number}   totalFollowing=0          The total amount of following the user has
 */
const singleState: User = {
  lastUpdated,
  id: null,
  displayName: null,
  profileImage: null,
  coverImage: null,
  bio: null,
  location: null,
  website: null,
  spotifyAccountStatus: null,
  coords: null,
  currentSessionID: null,
  favoriteTrackID: null,
  topPlaylists: [],
  recentlyPlayed: [],
  mostPlayed: [],
  followers: [],
  totalFollowers: 0,
  following: [],
  totalFollowing: 0,
};

/**
 * @constant
 * @alias usersState
 * @type {object}
 * 
 * @property {string}   lastUpdated        The date/time the users state was last updated
 * @property {string}   currentUserID      The Spotify id of the current user
 * @property {boolean}  searching=[]       Whether the current user is searching for users
 * @property {string[]} fetching=[]       The different types of info the current user is fetching
 * @property {boolean}  saving=false       Whether the current user is saving
 * @property {string}   changingImage=null Whether the current user is changing a profile/cover image
 * @property {Error}    error=null         The error related to users actions
 */
export const initialState: State = {
  lastUpdated,
  currentUserID: '',
  searching: [],
  fetching: [],
  saving: false,
  error: null,
};

/**
 * Adds or updates a single user
 * 
 * @function addOrUpdateUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {object} action.item The user object to add or update
 * 
 * @returns {object}             The single user added or updated with the new information
 */
function addOrUpdateUser(
  state: User,
  action: Action,
): User {
  const {coords, topPlaylists, recentlyPlayed, mostPlayed, followers, following} = state;
  const {item, refreshing} = action;
  const updates = (
    item
    && Array.isArray(topPlaylists)
    && Array.isArray(recentlyPlayed)
    && Array.isArray(mostPlayed)
    && Array.isArray(followers)
    && Array.isArray(following)
  )
    ? {
      ...item,
      lastUpdated,
      coords: item.coords ? {...item.coords} : coords,
      topPlaylists: item.topPlaylists && refreshing
        ? [...item.topPlaylists]
        : item.topPlaylists
        ? [...topPlaylists, ...item.topPlaylists]
        : [...topPlaylists],
      recentlyPlayed: Array.isArray(item.recentlyPlayed) && item.recentlyPlayed.length === 1
        ? [...item.recentlyPlayed, ...recentlyPlayed]
        : item.recentlyPlayed && refreshing
        ? [...item.recentlyPlayed]
        : item.recentlyPlayed
        ? [...recentlyPlayed, ...item.recentlyPlayed]
        : [...recentlyPlayed],
      mostPlayed: item.mostPlayed && refreshing
        ? [...item.mostPlayed]
        : item.mostPlayed
        ? [...mostPlayed, ...item.mostPlayed]
        : [...mostPlayed],
      followers: item.followers && refreshing
        ? [...item.followers]
        : item.followers
        ? [...followers, ...item.followers]
        : [...followers],
      following: item.following && refreshing
        ? [...item.following]
        : item.following
        ? [...following, ...item.following]
        : [...following],
    }
    : {};

  return updateObject(state, updates);
}

export function user(
  state: User = singleState,
  action: Action,
): User {
  switch (action.type) {
    case entitiesTypes.ADD_ENTITIES:
      return addOrUpdateUser(state, action);
    default:
      return state;
  }
}

/**
 * Updates any values in the users state
 * 
 * @funcion update
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {string} type        The type to add/remove from the fetching array
 * 
 * @returns {object}             The state updated with the new information
 */
function update(
  state: State,
  action: Action,
  type?: string,
): State {
  const {fetching: fetch} = state;
  const add: boolean = typeof action.type === 'string' && action.type.includes('REQUEST');
  const haveError: boolean = typeof action.type === 'string' && action.type.includes('FAILURE');
  const updates: State = Array.isArray(fetch)
    ? {
      fetching: add && type ? fetch.concat(type) : type ? fetch.filter(t => t !== type) : [...fetch],
      error: haveError ? action.error : null,
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
      case types.CHANGE_COVER_PHOTO_REQUEST:
      case types.CHANGE_COVER_PHOTO_SUCCESS:
      case types.CHANGE_COVER_PHOTO_FAILURE:
        return update(state, action, 'cover');
      case types.CHANGE_PROFILE_PHOTO_REQUEST:
      case types.CHANGE_PROFILE_PHOTO_SUCCESS:
      case types.CHANGE_PROFILE_PHOTO_FAILURE:
        return update(state, action, 'profile');
      case types.GET_USER_IMAGE_REQUEST:
      case types.GET_USER_IMAGE_SUCCESS:
      case types.GET_USER_IMAGE_FAILURE:
        return update(state, action, 'images');
      case types.RESET_USERS:
        return initialState;
      case types.SAVE_PROFILE_REQUEST:
        return updateObject(state, {saving: true, error: null});
      case types.SAVE_PROFILE_SUCCESS:
        return updateObject(state, {saving: false, error: null});
      case types.SAVE_PROFILE_FAILURE:
        return updateObject(state, {error: action.error, saving: false});
      case types.UPDATE_USERS:
        return updateObject(state, action.updates);
      default:
        return state;
    }
  }

  return state;
}