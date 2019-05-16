'use strict';

/**
 * @format
 * @flow
 */

// Blob
export type Blob = {
  +size: number,
  +type: string,
  +slice: () => Blob,
};

// Albums
export type BRAlbum = {
  id: string,
  plays: number,
  conversations?: {
    [key: string]: BRAlbumConversation,
  },
  playlists?: {
    [key: string]: BRAlbumPlaylist,
  },
  tracks?: {
    [key: string]: BRAlbumTrack,
  },
  users?: {
    [key: string]: BRAlbumUser,
  },
};

export type BRAlbumConversation = {
  id: string,
  plays: number,
};

export type BRAlbumPlaylist = {
  id: string,
  plays: number,
  owner: {
    id: string,
    type: string,
  },
};

export type BRAlbumTrack = {
  id: string,
  plays: number,
};

export type BRAlbumUser = {
  id: string,
  plays: number,
};

// Artists
export type BRArtist = {
  id: string,
  plays: number,
  albums?: {
    [key: string]: BRArtistAlbum,
  },
  conversations?: {
    [key: string]: BRArtistConversation,
  },
  playlists?: {
    [key: string]: BRArtistPlaylist,
  },
  tracks?: {
    [key: string]: BRArtistTrack,
  },
  users?: {
    [key: string]: BRArtistUser,
  },
};

export type BRArtistAlbum = {
  id: string,
  plays: number,
};

export type BRArtistConversation = {
  id: string,
  plays: number,
};

export type BRArtistPlaylist = {
  id: string,
  plays: number,
  owner: {
    id: string,
    type: string,
  },
};

export type BRArtistTrack = {
  id: string,
  plays: number,
};

export type BRArtistUser = {
  id: string,
  plays: number,
};

// Conversations
export type BRConversation = {
  id: string,
  name: string,
  lastSentTrack: string,
  lastSentMessage: string,
  totalActive: number,
  totalAttachments: number,
  totalMessages: number,
  totalUsers: number,
  attachments?: {
    [key: string]: BRConversationAttachment,
  },
  messages?: {
    [key: string]: BRConversationMessage,
  },
  users?: {
    [key: string]: BRConversationUser,
  },
};

export type BRConversationAttachment = {
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

export type BRConversationMessage = {
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

export type BRConversationUser = {
  id: string,
  displayName: string,
  image: string,
  muted: boolean,
  active: boolean,
};

// Credits
export type BRCredit = {
  name: string,
  id: string,
  photoURL: string,
  userID: string,
  username: string,
  userURL: string,
};

// Feedback
export type BRFeedback = {
  id: string,
  categories: Array<string>,
  message: string,
  reportedUser: string,
  type: string,
  userID: string,
};

// Geo
export type BRGeoItem = {
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
export type BRGroup = {
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
  featured?: {
    [key: string]: BRGroupFeature,
  },
  playlists?: {
    [key: string]: BRGroupPlaylist,
  },
  recentlyPlayed?: {
    [key: string]: BRGroupRecent,
  },
  users?: {
    [key: string]: BRGroupUser,
  },
};

export type BRGroupFeature = {
  id: string,
  name: string,
  image: string,
  owner: {
    id: string,
    displayName: string,
    image: string,
  },
};

export type BRGroupPlaylist = {
  id: string,
  userID: string,
};

export type BRGroupRecent = {
  id: string,
  trackID: string,
  userID: string,
};

export type BRGroupUser = {
  id: string,
  displayName: string,
  image: string,
  admin: boolean,
  members: boolean,
  timeJoined: string,
};

// Playlists
export type BRPlaylist = {
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
  tracks?: {
    [key: string]: BRPlaylistTrack,
  },
  users?: {
    [key: string]: BRPlaylistUser,
  },
};

export type BRPlaylistTrack = {
  id: string,
  plays: number,
};

export type BRPlaylistUser = {
  id: string,
  member: boolean,
  plays: number,
};

// Searches
export type BRSearch = {
  id: string,
  timestamp: string,
  query: string,
  coords: ?{
    lat: number,
    lon: number,
  },
};

// Sessions
export type BRSession = {
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
  messages?: {
    [key: string]: BRSessionMessage,
  },
  previouslyPlayed?: {
    [key: string]: BRSessionPrevious,
  },
  queue?: {
    [key: string]: BRSessionQueueTrack,
  },
  users?: {
    [key: string]: BRSessionUser,
  },
};

export type BRSessionMessage = {
  id: string,
  text: string,
  owner: string,
  timestamp: string,
  read: Array<string>,
};

export type BRSessionPrevious = {
  id: string,
  trackID: string,
  userID: string,
  totalLikes: number,
  prevQueueID: string,
  nextQueueID: string,
};

export type BRSessionQueueTrack = {
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

export type BRSessionQueueTrackLike = {
  id: string,
  timeLiked: string,
};

export type BRSessionUser = {
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
export type BRSessionSetting = {
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
export type BRTrack = {
  id: string,
  plays: number,
  conversations?: {
    [key: string]: BRTrackConversation,
  },
  playlists?: {
    [key: string]: BRTrackPlaylist,
  },
  users?: {
    [key: string]: BRTrackUser,
  },
};

export type BRTrackConversation = {
  id: string,
  plays: number,
};

export type BRTrackPlaylist = {
  id: string,
  plays: number,
};

export type BRTrackUser = {
  id: string,
  plays: number,
};

// Users
export type BRUser = {
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
  +albums?: {
    [key: string]: BRUserAlbum,
  },
  +artists?: {
    [key: string]: BRUserArtist,
  },
  +blockedUsers?: {
    [key: string]: BRUserBlockedUser,
  },
  +conversations?: {
    [key: string]: BRUserConversation,
  },
  +followers?: {
    [key: string]: BRUserFollower,
  },
  +following?: {
    [key: string]: BRUserFollowing,
  },
  +groups?: {
    [key: string]: BRUserGroup,
  },
  +playlists?: {
    [key: string]: BRUserPlaylist,
  },
  +recentlyPlayed?: {
    [key: string]: BRUserRecent,
  },
  +searches?: {
    [key: string]: BRUserSearch,
  },
  +sessions?: {
    [key: string]: BRUserSession,
  },
  +tracks?: {
    [key: string]: BRUserTrack,
  },
};

export type BRUserAlbum = {
  id: string,
  plays: number,
};

export type BRUserArtist = {
  id: string,
  plays: number,
};

export type BRUserBlockedUser = {
  id: string,
  timeBlocked: string,
};

export type BRUserConversation = {
  id: string,
  plays: number,
};

export type BRUserFollower = {
  id: string,
  displayName: string,
  profileImage: string,
  notify: boolean,
};

export type BRUserFollowing = {
  id: string,
  displayName: string,
  profileImage: string,
  notify: boolean,
  live: boolean,
  currentSessionID: string,
};

export type BRUserGroup = {
  id: string,
  admin: boolean,
  member: boolean,
};

export type BRUserPlaylist = {
  id: string,
  plays: number,
  member: boolean,
  tracks?: {
    [key: string]: BRUserPlaylistTrack,
  },
};

export type BRUserPlaylistTrack = {
  id: string,
  plays: number,
};

export type BRUserRecent = {
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

export type BRUserSearch = {
  id: string,
  query: string,
  timestamp: string,
};

export type BRUserSession = {
  id: string,
  timeJoined: string,
  timeLeft: string,
};

export type BRUserTrack = {
  id: string,
  plays: number,
};