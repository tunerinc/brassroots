'use strict';

/**
 * @format
 * @flow
 */

import Spotify from 'rn-spotify-sdk';

type FullAlbum = {|
  +album_type: string,
  +artists: Array<SimpleArtist>,
  +available_markets: Array<string>,
  +copyrights: Array<Copyright>,
  +external_ids: ExternalID,
  +external_urls: ExternalURL,
  +genres: Array<string>,
  +href: string,
  +id: string,
  +images: Array<Image>,
  +label: string,
  +name: string,
  +popularity: number,
  +release_date: string,
  +release_date_precision: string,
  +restrictions: Restrictions,
  +tracks: Paging,
  +type: string,
  +uri: string,
|};

type SimpleAlbum = {|
  +album_group?: string,
  +album_type: string,
  +artists: Array<SimpleArtist>,
  +available_markets: Array<string>,
  +external_urls: ExternalURL,
  +href: string,
  +id: string,
  +images: Array<Image>,
  +name: string,
  +release_date: string,
  +release_date_precision: string,
  +restrictions: Restrictions,
  +type: string,
  +uri: string,
|};

type Restrictions = {|
  +reason: string,
|};

type FullArtist = {|
  +external_urls: ExternalURL,
  +followers: Followers,
  +genres: Array<string>,
  +href: string,
  +id: string,
  +images: Array<Image>,
  +name: string,
  +popularity: number,
  +type: string,
  +uri: string,
|};

type SimpleArtist = {|
  +external_urls: ExternalURL,
  +href: string,
  +id: string,
  +name: string,
  +type: string,
  +uri: string,
|};

type AudioFeatures = {|
  +acousticness: number,
  +analysis_url: string,
  +danceability: number,
  +duration_ms: number,
  +energy: number,
  +id: string,
  +instrumentalness: number,
  +key: number,
  +liveness: number,
  +loudness: number,
  +mode: number,
  +speechiness: number,
  +tempo: number,
  +time_signature: number,
  +track_href: string,
  +type: string,
  +uri: string,
  +valence: number,
|};

type Category = {|
  +href: string,
  +icons: Array<Image>,
  +id: string,
  +name: string,
|};

type Context = {|
  +type: string,
  +href: string,
  +external_urls: ExternalURL,
  +uri: string,
|};

type Copyright = {|
  +text: string,
  +type: string,
|};

type Cursor = {|
  +after: string,
|};

type Disallows = {|
  +interrupting_playback?: boolean | void,
  +pausing?: boolean | void,
  +playing?: boolean | void,
  +resuming?: boolean | void,
  +seeking?: boolean | void,
  +skipping_next?: boolean | void,
  +skipping_prev?: boolean | void,
  +stopping?: boolean | void,
  +toggling_repeat_context?: boolean | void,
  +toggling_shuffle?: boolean | void,
  +toggling_repeat_track?: boolean | void,
  +transferring_playback?: boolean | void,
|};

type SpotifyError = {|
  +error: {
    +status: number,
    +message: string,
  },
|};

type PlayerError = {|
  ...SpotifyError,
  +reason: string,
|};

type ExternalID = {|
  +[key: string]: string,
|};

type ExternalURL = {|
  +[key: string]: string
|};

type Followers = {|
  +href: ?string,
  +total: number,
|};

type Image = {|
  +height: number,
  +url: string,
  +width: number,
|};

type Paging = {|
  +href: string,
  +limit: number,
  +next: ?string,
  +offset: number,
  +previous: ?string,
  +total: number,
  +items: Array<
    FullAlbum
    | SimpleAlbum
    | FullArtist
    | SimpleArtist
    | FullPlaylist
    | SimplePlaylist
    | FullTrack
    | SimpleTrack
    | PlaylistTrack
    | Category
    | PlayHistory
    | SavedTrack
    | SavedAlbum
  >,
|};

type CursorPaging = {|
  +href: string,
  +limit: number,
  +next: ?string,
  +cursor: Cursor,
  +total: number,
  +items: Array<
    FullAlbum
    | SimpleAlbum
    | FullArtist
    | SimpleArtist
    | FullPlaylist
    | SimplePlaylist
    | FullTrack
    | SimpleTrack
    | PlaylistTrack
    | Category
    | PlayHistory
    | SavedTrack
    | SavedAlbum
  >,
|};

type PlayHistory = {|
  +track: SimpleTrack,
  +played_at: string,
  +context: Context,
|};

type FullPlaylist = {|
  +collaborative: boolean,
  +description: string,
  +external_urls: ExternalURL,
  +followers: Followers,
  +href: string,
  +id: string,
  +images: Array<Image>,
  +name: string,
  +owner: PublicUser,
  +public: ?boolean,
  +snapshot_id: string,
  +tracks: Paging,
  +type: string,
  +uri: string,
|};

type SimplePlaylist = {|
  +collaborative: boolean,
  +external_urls: ExternalURL,
  +href: string,
  +id: string,
  +images: Array<Image>,
  +name: string,
  +owner: PublicUser,
  +public: ?boolean,
  +snapshot_id: string,
  +tracks: {+href: string, +total: number},
  +type: string,
  +uri: string,
|};

type PlaylistTrack = {|
  +added_at: string,
  +added_by: ?PublicUser,
  +is_local: boolean,
  +track: FullTrack,
|};

type Recommendations = {|
  +seeds: Array<RecommendationSeed>,
  +tracks: Array<SimpleTrack>,
|};

type RecommendationSeed = {|
  +afterFilteringSize: number,
  +afterRelinkingSize: number,
  +href: ?string,
  +id: string,
  +initialPoolSize: number,
  +type: string,
|};

type SavedTrack = {|
  +added_at: string,
  +track: FullTrack,
|};

type SavedAlbum = {|
  +added_at: string,
  +album: FullAlbum,
|};

type FullTrack = {|
  +album: SimpleAlbum,
  +artists: Array<SimpleArtist>,
  +available_markets: Array<string>,
  +disc_number: number,
  +duration_ms: number,
  +explicit: boolean,
  +external_ids: ExternalID,
  +external_urls: ExternalURL,
  +href: string,
  +id: string,
  +is_playable: boolean,
  +linked_from: LinkedTrack,
  +restrictions: Restrictions,
  +name: string,
  +popularity: number,
  +preview_url: string,
  +track_number: number,
  +type: string,
  +uri: string,
  +is_local: boolean,
|};

type SimpleTrack = {|
  +artists: Array<SimpleArtist>,
  +available_markets: Array<string>,
  +disc_number: number,
  +duration_ms: number,
  +explicit: boolean,
  +external_urls: ExternalURL,
  +href: string,
  +id: string,
  +is_playable: boolean,
  +linked_from: LinkedTrack,
  +restrictions: Restrictions,
  +name: string,
  +preview_url: string,
  +track_number: number,
  +type: string,
  +uri: string,
  +is_local: boolean,
|};

type LinkedTrack = {|
  +external_urls: ExternalURL,
  +href: string,
  +id: string,
  +type: string,
  +uri: string,
|};

type PrivateUser = {|
  +birthdate: string,
  +country: string,
  +display_name: string,
  +email: string,
  +external_urls: ExternalURL,
  +followers: Followers,
  +href: string,
  +id: string,
  +images: Array<Image>,
  +product: string,
  +type: string,
  +uri: string,
|};

type PublicUser = {|
  +display_name: string,
  +external_urls: ExternalURL,
  +followers: Followers,
  +href: string,
  +id: string,
  +images: Array<Image>,
  +type: string,
  +uri: string,
|};

type CurrentlyPlaying = {|
  +context: Context,
  +timestamp: number,
  +progress_ms: number,
  +is_playing: boolean,
  +item: ?FullTrack,
  +currently_playing_tyoe: string,
|};

type Device = {|
  +id: ?string,
  +is_active: boolean,
  +is_private_session: boolean,
  +is_restricted: boolean,
  +name: string,
  +type: string,
  +volume_percent: ?number,
|};

type Devices = {|
  +devices: Array<Device>,
|};

type TuneableTrack = {|
  +acousticness: number,
  +danceability: number,
  +duration_ms: number,
  +energy: number,
  +instrumentalness: number,
  +key: number,
  +liveness: number,
  +loudness: number,
  +mode: number,
  +popularity: number,
  +speechiness: number,
  +tempo: number,
  +time_signature: number,
  +valence: number,
|};

export type {
  FullAlbum,
  SimpleAlbum,
  Restrictions,
  FullArtist,
  SimpleArtist,
  AudioFeatures,
  Category,
  Context,
  Copyright,
  Cursor,
  Disallows,
  SpotifyError,
  PlayerError,
  ExternalID,
  ExternalURL,
  Followers,
  Image,
  Paging,
  CursorPaging,
  PlayHistory,
  FullPlaylist,
  SimplePlaylist,
  PlaylistTrack,
  Recommendations,
  RecommendationSeed,
  SavedTrack,
  SavedAlbum,
  FullTrack,
  SimpleTrack,
  LinkedTrack,
  PrivateUser,
  PublicUser,
  CurrentlyPlaying,
  Device,
  Devices,
  TuneableTrack,
};