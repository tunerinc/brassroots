'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/search/types';
import type {SpotifyError} from '../utils/spotifyAPI/types';

const currentDate: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

export type State = {
  +recentSearches: Array<string>,
  +nearbySearches: Array<string>,
  +trendingSearches: Array<string>,
  +userResults: Array<string>,
  +trackResults: Array<string>,
  +playlistResults: Array<string>,
  +albumResults: Array<string>,
  +artistResults: Array<string>,
  +groupResults: Array<string>,
  +query: string,
  +fetchingRecent: boolean,
  +fetchingTrending: boolean,
  +fetchingNearby: boolean,
  +searching: boolean,
  +deleting: boolean,
  +lastUpdated: string,
  +error: ?Error | SpotifyError,
};

/**
 * @constant
 * @alias searchState
 * @type {object}
 * 
 * @property {string[]} recentSearches         The current user's recent searches on Brassroots
 * @property {string[]} nearbySearches         The searches nearby to the current user
 * @property {string[]} trendingSearches       The trending searches on Brassroots
 * @property {string[]} userResults            The Brassroots ids of the returned user results
 * @property {string[]} trackResults           The Spotify ids of the returned track results
 * @property {string[]} playlistResults        The Spotify ids of the returned playlist results
 * @property {string[]} albumResults           The Spotify ids of the returned album results
 * @property {string[]} artistResults          The Spotify ids of the returned artist results
 * @property {string[]} groupResults           The Brassroots ids of the returned group results
 * @property {string}   query                  The query used to search
 * @property {boolean}  fetchingRecent=false   Whether the current user is fetching recent searches
 * @property {boolean}  fetchingTrending=false Whether the current user is fetching trending searches
 * @property {boolean}  fetchingNearby=false   Whether the current user is fetching nearby searches
 * @property {boolean}  searching=false        Whether the current user is searching
 * @property {boolean}  deleting=false         Whether the current user is deleting their recent searches
 * @property {string}   lastUpdated            The date/time the searches were last updated
 * @property {Error}    error=null             The error related to search actions
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
  fetchingRecent: false,
  fetchingTrending: false,
  fetchingNearby: false,
  searching: false,
  deleting: false,
  lastUpdated: currentDate,
  error: null,
};

export default function reducer(
  state: State = initialState,
  action: {type: string} = {},
): State {
  switch (action.type) {
    default:
      return state;
  }
}