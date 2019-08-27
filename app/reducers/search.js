'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/search/types';
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';

const currentDate: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type Action = {
  +type?: string,
  +error?: Error,
  +updates?: State,
};

type State = {
  +recentSearches?: Array<string>,
  +nearbySearches?: Array<string>,
  +trendingSearches?: Array<string>,
  +userResults?: Array<string>,
  +trackResults?: Array<string>,
  +playlistResults?: Array<string>,
  +albumResults?: Array<string>,
  +artistResults?: Array<string>,
  +groupResults?: Array<string>,
  +query?: string,
  +fetching?: Array<string>,
  +searching?: boolean,
  +deleting?: boolean,
  +lastUpdated?: string,
  +error?: ?Error | SpotifyError,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Action,
  State,
};

/**
 * @constant
 * @alias searchState
 * @type {object}
 * 
 * @property {string[]} recentSearches       The current user's recent searches on Brassroots
 * @property {string[]} nearbySearches       The searches nearby to the current user
 * @property {string[]} trendingSearches     The trending searches on Brassroots
 * @property {string[]} userResults          The Brassroots ids of the returned user results
 * @property {string[]} trackResults         The Spotify ids of the returned track results
 * @property {string[]} playlistResults      The Spotify ids of the returned playlist results
 * @property {string[]} albumResults         The Spotify ids of the returned album results
 * @property {string[]} artistResults        The Spotify ids of the returned artist results
 * @property {string[]} groupResults         The Brassroots ids of the returned group results
 * @property {string}   query                The query used to search
 * @property {boolean}  fetchingRecent=false Whether the current user is fetching
 * @property {boolean}  searching=false      Whether the current user is searching
 * @property {boolean}  deleting=false       Whether the current user is deleting their recent searches
 * @property {string}   lastUpdated          The date/time the searches were last updated
 * @property {Error}    error=null           The error related to search actions
 */
export const initialState: State = {
  recentSearches: [],
  nearbySearches: [],
  trendingSearches: [],
  userResults: [],
  trackResults: [],
  playlistResults: [],
  albumResults: [],
  artistResults: [],
  groupResults: [],
  query: '',
  fetching: [],
  searching: false,
  deleting: false,
  lastUpdated: currentDate,
  error: null,
};

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.RESET_SEARCH:
        return initialState;
      case types.UPDATE_SEARCH:
        return updateObject(state, action.updates);
      default:
        return state;
    }
  }

  return state;
}