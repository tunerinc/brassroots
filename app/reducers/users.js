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
import {type Action as OnboardingAction} from './onboarding';

// Case Functions
import {addSingleCoverImage, addCoverImage} from '../actions/users/AddCoverImage/reducers';
import {addSingleLocation, addCurrentLocation} from '../actions/users/AddCurrentLocation/reducers';
import {addSingleCurrentUser, addCurrentUser} from '../actions/users/AddCurrentUser/reducers';
import {addFavoriteTrack} from '../actions/users/AddFavoriteTrack/reducers';
import {addSinglePeople, addPeople} from '../actions/users/AddPeople/reducers';
import {addUserMostPlayed} from '../actions/users/AddUserMostPlayed/reducers';
import {addUserRecentlyPlayed} from '../actions/users/AddUserRecentlyPlayed/reducers';
import {addSingleRecentTrack, addUserRecentTrack} from '../actions/users/AddUserRecentTrack/reducers';
import {addUserTopPlaylists} from '../actions/users/AddUserTopPlaylists/reducers';
import * as changeCoverPhoto from '../actions/users/ChangeCoverPhoto/reducers';
import * as changeProfilePhoto from '../actions/users/ChangeProfilePhoto/reducers';
import * as getUserImage from '../actions/users/GetUserImage/reducers';
import * as saveProfile from '../actions/users/SaveProfile/reducers';
import {setCameraRollPhotoIndex} from '../actions/users/SetCameraRollPhotoIndex/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | OnboardingAction | PromiseAction | ThunkAction | Array<Action>) => any;

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
  +people?: {+[id: string]: User},
  +userID?: string,
  +trackID?: string,
  +index?: number,
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
  +searchingUsers?: boolean,
  +fetchingUsers?: boolean,
  +fetchingImages?: boolean,
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
 * @property {string}  lastUpdated          The date/time the users state was last updated
 * @property {string}  currentUserID        The Spotify id of the current user
 * @property {boolean} searchingUsers=false Whether the current user is searching for users
 * @property {boolean} fetchingUsers=false  Whether the current user is fetching users
 * @property {boolean} fetchingImages=false Whether the current user is fetching images of users
 * @property {boolean} savingUser=false     Whether the current user is saving
 * @property {string}  changingImage=null   Whether the current user is changing a profile/cover image
 * @property {Error}   error=null           The error related to users actions
 */
export const initialState: State = {
  lastUpdated,
  currentUserID: '',
  searchingUsers: false,
  fetchingUsers: false,
  fetchingImages: false,
  savingUser: false,
  changingImage: null,
  error: null,
};

/**
 * Adds the music of a single user
 * 
 * @function addSingleUserMusic
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                    The Redux state
 * @param   {object}   action                   The Redux action
 * @param   {string}   action.type              The type of Redux action
 * @param   {string}   [action.userID]          The Brassroots id of the single user
 * @param   {string[]} [action.mostPlayed]      The Spotify ids of the single user's most played tracks to add
 * @param   {string[]} [action.recentlyPlayed]  The Spotify ids of the single user's recently played tracks to add
 * @param   {string[]} [action.topPlaylists]    The SPotify ids of the single user's top playlists to add
 * @param   {string}   [action.favoriteTrackID] The Spotify id of the single user's favorite track to add
 * 
 * @returns {object}                            The state of the single user with the new music added
 */
function addSingleUserMusic(
  state: User,
  action: Action,
): User {
  const {mostPlayed, recentlyPlayed, topPlaylists, favoriteTrackID} = action;
  const {
    mostPlayed: oldMost,
    recentlyPlayed: oldRecent,
    topPlaylists: oldTop,
    favoriteTrackID: oldFavorite,
  } = state;


  return updateObject(state, {
    mostPlayed: mostPlayed || oldMost,
    recentlyPlayed: recentlyPlayed || oldRecent,
    topPlaylists: topPlaylists || oldTop,
    favoriteTrackID: favoriteTrackID || oldFavorite,
  });
};

export function singleUser(
  state: User = singleState,
  action: Action,
): User {
  switch (action.type) {
    case types.ADD_COVER_IMAGE:
      return addSingleCoverImage(state, action);
    case types.ADD_CURRENT_LOCATION:
      return addSingleLocation(state, action);
    case types.ADD_CURRENT_USER:
      return addSingleCurrentUser(state, action);
    case types.ADD_FAVORITE_TRACK:
      return addSingleUserMusic(state, action);
    case types.ADD_PEOPLE:
      return addSinglePeople(state, action);
    case types.ADD_USER_MOST_PLAYED:
      return addSingleUserMusic(state, action);
    case types.ADD_USER_RECENTLY_PLAYED:
      return addSingleUserMusic(state, action);
    case types.ADD_USER_RECENT_TRACK:
      return addSingleRecentTrack(state, action);
    case types.ADD_USER_TOP_PLAYLISTS:
      return addSingleUserMusic(state, action);
    case types.CHANGE_COVER_PHOTO_SUCCESS:
      return changeCoverPhoto.addImage(state, action);
    case types.CHANGE_PROFILE_PHOTO_SUCCESS:
      return changeProfilePhoto.addImage(state, action);
    case types.GET_USER_IMAGE_SUCCESS:
      return getUserImage.addImage(state, action);
    case types.SAVE_PROFILE_SUCCESS:
      return saveProfile.save(state, action);
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
      case types.ADD_CURRENT_LOCATION:
        return addCurrentLocation(state, action);
      case types.ADD_CURRENT_USER:
        return addCurrentUser(state, action);
      case types.ADD_FAVORITE_TRACK:
        return addFavoriteTrack(state, action);
      case types.ADD_PEOPLE:
        return addPeople(state, action);
      case types.ADD_USER_MOST_PLAYED:
        return addUserMostPlayed(state, action);
      case types.ADD_USER_RECENTLY_PLAYED:
        return addUserRecentlyPlayed(state, action);
      case types.ADD_USER_RECENT_TRACK:
        return addUserRecentTrack(state, action);
      case types.ADD_USER_TOP_PLAYLISTS:
        return addUserTopPlaylists(state, action);
      case types.CHANGE_COVER_PHOTO_REQUEST:
        return changeCoverPhoto.request(state);
      case types.CHANGE_COVER_PHOTO_SUCCESS:
        return changeCoverPhoto.success(state);
      case types.CHANGE_COVER_PHOTO_FAILURE:
        return changeCoverPhoto.failure(state, action);
      case types.CHANGE_PROFILE_PHOTO_REQUEST:
        return changeProfilePhoto.request(state);
      case types.CHANGE_PROFILE_PHOTO_SUCCESS:
        return changeProfilePhoto.success(state, action);
      case types.CHANGE_PROFILE_PHOTO_FAILURE:
        return changeProfilePhoto.failure(state, action);
      case types.GET_USER_IMAGE_REQUEST:
        return getUserImage.request(state);
      case types.GET_USER_IMAGE_SUCCESS:
        return getUserImage.success(state, action);
      case types.GET_USER_IMAGE_FAILURE:
        return getUserImage.failure(state, action);
      case types.RESET_USERS:
        return initialState;
      case types.SAVE_PROFILE_REQUEST:
        return saveProfile.request(state);
      case types.SAVE_PROFILE_SUCCESS:
        return saveProfile.success(state, action);
      case types.SAVE_PROFILE_FAILURE:
        return saveProfile.failure(state, action);
      case types.SET_CAMERA_ROLL_PHOTO_INDEX:
        return setCameraRollPhotoIndex(state, action);
      default:
        return state;
    }
  }

  return state;
}