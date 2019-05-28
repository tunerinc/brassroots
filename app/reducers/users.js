'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/users/types';
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';

// Case Functions
import {addSingleCoverImage, addCoverImage} from '../actions/users/AddCoverImage/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type User = {
  +lastUpdated?: string,
  +id?: ?string,
  +displayName?: ?string,
  +profileImage?: ?string,
  +coverImage?: ?string,
  +bio?: ?string,
  +location?: ?string,
  +website?: ?string,
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
  +photo?: string,
};

type State = {
  +lastUpdated?: string,
  +currentUserID?: ?string,
  +usersByID?: {+[key: string]: User},
  +totalUsers?: number,
  +searchingUsers?: boolean,
  +fetchingUsers?: boolean,
  +savingUser?: boolean,
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
 * @property {string}   lastUpdated           The date/time the user's information was last updated
 * @property {string}   id=null               The Spotify id of the user
 * @property {string}   displayName=null      The Spotify display name of the user
 * @property {string}   profileImage=null     The user's profile image url
 * @property {string}   coverImage=null       The user's cover image url
 * @property {string}   bio=null              The bio of the user
 * @property {string}   location=null         The location the user has set
 * @property {string}   website=null          The website the user has set
 * @property {object}   [coords=null]         The coordinates of the user, only applicable if the current user.
 * @property {number}   coords.lat            The latitude value of the user's coordinates
 * @property {number}   coords.lon            The longitude value of the user's coordinates
 * @property {string}   currentSessionID=null The Brassroots id of the session the user is in
 * @property {string}   favoriteTrackID=null  The Spotify id of the user's favorite track
 * @property {string[]} topPlaylists          The Spotify ids of the user's top playlists they play
 * @property {string[]} recentlyPlayed        The Spotify ids of the tracks the user has recently played
 * @property {string[]} mostPlayed            The Spotify ids of the tracks the user has played the most
 * @property {string[]} followers             The Brassroots ids of the followers of the user
 * @property {number}   totalFollowers=0      The total amount of followers the user has
 * @property {string[]} following             The Brassroots ids of the following of the user
 * @property {number}   totalFollowing=0      The total amount of following the user has
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
 * @property {string}  lastUpdated          The date/time the users state was last updated
 * @property {string}  currentUserID        The Spotify id of the current user
 * @property {object}  usersByID            The user objects saved in Redux
 * @property {number}  totalUsers=0         The total amount of users in Redux
 * @property {boolean} searchingUsers=false Whether the current user is searching for users
 * @property {boolean} fetchingUsers=false  Whether the current user is fetching users
 * @property {boolean} savingUser=false     Whether the current user is saving
 * @property {string}  changingImage=null   Whether the current user is changing a profile/cover image
 * @property {Error}   error=null           The error related to users actions
 */
export const initialState: State = {
  lastUpdated,
  currentUserID: '',
  usersByID: {},
  totalUsers: 0,
  searchingUsers: false,
  fetchingUsers: false,
  savingUser: false,
  changingImage: null,
  error: null,
};

export function singleUser(
  state: User = singleState,
  action: Action,
): User {
  switch (action.type) {
    case types.ADD_COVER_IMAGE:
      return addSingleCoverImage(state, action);
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
      case types.ADD_COVER_IMAGE:
        return addCoverImage(state, action);
      default:
        return state;
    }
  }

  return state;
}