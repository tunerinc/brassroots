'use strict';

/**
 * @format
 * @flow
 */

// Blob
type Blob = {
  +size: number,
  +type: string,
  +slice: () => Blob,
};

// Albums
type BRAlbum = {
  id: string,
  plays: number,
};

type BRAlbumConversation = {
  id: string,
  plays: number,
};

type BRAlbumPlaylist = {
  id: string,
  plays: number,
  owner: {
    id: string,
    type: string,
  },
};

type BRAlbumTrack = {
  id: string,
  plays: number,
};

type BRAlbumUser = {
  id: string,
  plays: number,
};

// Artists
type BRArtist = {
  id: string,
  plays: number,
};

type BRArtistAlbum = {
  id: string,
  plays: number,
};

type BRArtistConversation = {
  id: string,
  plays: number,
};

type BRArtistPlaylist = {
  id: string,
  plays: number,
  owner: {
    id: string,
    type: string,
  },
};

type BRArtistTrack = {
  id: string,
  plays: number,
};

type BRArtistUser = {
  id: string,
  plays: number,
};

// Conversations
type BRConversation = {
  id: string,
  name: string,
  lastSentTrack: string,
  lastSentMessage: string,
  totalActive: number,
  totalAttachments: number,
  totalMessages: number,
  totalUsers: number,
};

type BRConversationAttachment = {
  id: string,
  trackID: string,
  type: string,
  name: string,
  artists: string,
  album: string,
  owner: string,
  plays: number,
  listened: Array<string>,
};

type BRConversationMessage = {
  id: string,
  owner: string,
  text: string,
  timestamp: string,
  deleted: Array<string>,
  read: Array<string>,
  attachment: {
    type: string,
    id: string,
    name: string,
    owner: string,
  },
};

type BRConversationUser = {
  id: string,
  displayName: string,
  image: string,
  muted: boolean,
  active: boolean,
};

// Credits
type BRCredit = {
  name: string,
  id: string,
  photoURL: string,
  userID: string,
  username: string,
  userURL: string,
};

// Feedback
type BRFeedback = {
  id: string,
  categories: Array<string>,
  message: string,
  reportedUser: string,
  type: string,
  userID: string,
};

// Geo
type BRGeoItem = {
  id: string,
  type: string,
  coords: {},
  timestamp?: string,
  query?: string,
  currentTrackID?: string,
  totalListeners?: number,
  owner?: {
    id: string,
    name: string,
    image: string,
  },
};

// Groups
type BRGroup = {
  id: string,
  bio: string,
  conversationID: string,
  coverImage: string,
  groupImage: string,
  location: string,
  name: string,
  website: string,
  totalMembers: number,
  totalPlaylists: number,
  totalRecentlyPlayed: number,
  totalUsers: number,
  permissions: {
    join: string,
  },
};

type BRGroupFeature = {
  id: string,
  name: string,
  image: string,
  owner: {
    id: string,
    displayName: string,
    image: string,
  },
};

type BRGroupPlaylist = {
  id: string,
  userID: string,
};

type BRGroupRecent = {
  id: string,
  trackID: string,
  userID: string,
};

type BRGroupUser = {
  id: string,
  displayName: string,
  image: string,
  admin: boolean,
  members: boolean,
  timeJoined: string,
};

// Playlists
type BRPlaylist = {
  id: string,
  image: string,
  mode: string,
  private: boolean,
  name: string,
  plays: number,
  totalMembers: number,
  totalUsers: number,
  owner: {
    id: string,
    type: string,
    name: string,
  },
};

type BRPlaylistTrack = {
  id: string,
  plays: number,
};

type BRPlaylistUser = {
  id: string,
  member: boolean,
  plays: number,
};

// Searches
type BRSearch = {
  id: string,
  timestamp: string,
  query: string,
  coords: ?{
    lat: number,
    lon: number,
  },
};

// Sessions
type BRSession = {
  id: string,
  progress: number,
  currentTrackID: string,
  currentQueueID: string,
  timeLastPlayed: string,
  mode: string,
  live: boolean,
  paused: boolean,
  repeat: boolean,
  seeking: boolean,
  shuffle: boolean,
  context: {
    id: string,
    name: string,
    type: string,
    displayName: string,
    position: number,
    tracks: Array<string>,
  },
  coords: ?{
    lat: number,
    lon: number,
  },
  owner: {
    id: string,
    name: string,
    image: string,
    updatedFollowers: boolean,
  },
  totals: {
    context: number,
    followers: number,
    listeners: number,
    messages: number,
    queue: number,
    previouslyPlayed: number,
    users: number,
  },
};

type BRSessionMessage = {
  id: string,
  text: string,
  owner: string,
  timestamp: string,
  read: Array<string>,
};

type BRSessionPrevious = {
  id: string,
  trackID: string,
  userID: string,
  totalLikes: number,
  prevQueueID: string,
  nextQueueID: string,
};

type BRSessionQueueTrack = {
  id: string,
  timeAdded: string,
  added: boolean,
  prevQueueID: ?string,
  nextQueueID: ?string,
  totalLikes: number,
  track: {
    id: string,
    name: string,
    durationMS: number,
    album: {
      id: string,
      name: string,
      small: string,
      medium: string,
      large: string,
    },
    artists: Array<
      {
        id: string,
        name: string,
      }
    >,
  },
  user: {
    id: string,
    displayName: string,
    profileImage: string,
  },
  likes?: {
    [key: string]: BRSessionQueueTrackLike,
  },
};

type BRSessionQueueTrackLike = {
  id: string,
  timeLiked: string,
};

type BRSessionUser = {
  id: string,
  displayName: string,
  profileImage: string,
  timeJoined: string,
  totalFollowers: number,
  updatedFollowers: boolean,
  active: boolean,
  paused: boolean,
  progress: number,
  muted: boolean,
};

// Settings
type BRSessionSetting = {
  id: string,
  soundEffects: boolean,
  theme: string,
  language: string,
  region: string,
  notify: {
    session: string,
    chat: string,
    message: boolean,
    groupMessage: string,
    nearbySession: string,
    playlistChange: boolean,
    playlistJoin: boolean,
    likedTrack: boolean,
    newFollower: boolean,
  },
  preference: {
    playlist: string,
    session: string,
    message: string,
    muteNearby: boolean,
  },
};

// Tracks
type BRTrack = {
  id: string,
  plays: number,
};

type BRTrackConversation = {
  id: string,
  plays: number,
};

type BRTrackPlaylist = {
  id: string,
  plays: number,
};

type BRTrackUser = {
  id: string,
  plays: number,
};

// Users
type BRUser = {
  +id?: string,
  +favoriteTrackID?: ?string,
  +bio?: ?string,
  +birthdate?: string,
  +coverImage?: ?string,
  +country?: string,
  +email?: string,
  +location?: ?string,
  +online?: boolean,
  +profileImage?: string,
  +spotifyAccountStatus?: string,
  +displayName?: string,
  +website?: ?string,
  +currentSession?: ?{
    id: string,
    currentTrackID: string,
    totalListeners: number,
    coords: ?{
      lat: number,
      lon: number,
    },
    owner: {
      id: string,
      name: string,
      image: string,
    },
  },
  +totals?: {
    blocked: number,
    conversations: number,
    feedback: number,
    followingGroups: number,
    followers: number,
    following: number,
    memberInGroups: number,
    recentlyPlayed: number,
    searches: number,
  },
};

type BRUserAlbum = {
  id: string,
  plays: number,
};

type BRUserArtist = {
  id: string,
  plays: number,
};

type BRUserBlockedUser = {
  id: string,
  timeBlocked: string,
};

type BRUserConversation = {
  id: string,
  plays: number,
};

type BRUserFollower = {
  id: string,
  displayName: string,
  profileImage: string,
  notify: boolean,
};

type BRUserFollowing = {
  id: string,
  displayName: string,
  profileImage: string,
  notify: boolean,
  live: boolean,
  currentSessionID: string,
};

type BRUserGroup = {
  id: string,
  admin: boolean,
  member: boolean,
};

type BRUserPlaylist = {
  id: string,
  plays: number,
  member: boolean,
  tracks?: {
    [key: string]: BRUserPlaylistTrack,
  },
};

type BRUserPlaylistTrack = {
  id: string,
  plays: number,
};

type BRUserRecent = {
  id: string,
  trackID: string,
  timeAdded: string,
  trackNumber: number,
  durationMS: number,
  name: string,
  album: {
    id: string,
    name: string,
    small: string,
    medium: string,
    large: string,
    artists: Array<
      {
        id: string,
        name: string,
      }
    >,
  },
  artists: Array<
    {
      id: string,
      name: string,
    }
  >,
};

type BRUserSearch = {
  id: string,
  query: string,
  timestamp: string,
};

type BRUserSession = {
  id: string,
  timeJoined: string,
  timeLeft: string,
};

type BRUserTrack = {
  id: string,
  plays: number,
};

export type {
  Blob,
  BRAlbum,
  BRAlbumConversation,
  BRAlbumPlaylist,
  BRAlbumTrack,
  BRAlbumUser,
  BRArtist,
  BRArtistAlbum,
  BRArtistConversation,
  BRArtistPlaylist,
  BRArtistTrack,
  BRArtistUser,
  BRConversation,
  BRConversationAttachment,
  BRConversationMessage,
  BRConversationUser,
  BRCredit,
  BRFeedback,
  BRGeoItem,
  BRGroup,
  BRGroupFeature,
  BRGroupPlaylist,
  BRGroupRecent,
  BRGroupUser,
  BRPlaylist,
  BRPlaylistTrack,
  BRPlaylistUser,
  BRSearch,
  BRSession,
  BRSessionMessage,
  BRSessionPrevious,
  BRSessionQueueTrack,
  BRSessionQueueTrackLike,
  BRSessionSetting,
  BRSessionUser,
  BRTrack,
  BRTrackConversation,
  BRTrackPlaylist,
  BRTrackUser,
  BRUser,
  BRUserAlbum,
  BRUserArtist,
  BRUserBlockedUser,
  BRUserConversation,
  BRUserFollower,
  BRUserFollowing,
  BRUserGroup,
  BRUserPlaylist,
  BRUserPlaylistTrack,
  BRUserRecent,
  BRUserSearch,
  BRUserSession,
  BRUserTrack,
};