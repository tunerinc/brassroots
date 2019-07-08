'use strict';

/**
 * @format
 * @flow
 */

 // React
import React from 'react';
import PropTypes from 'prop-types'
import {StyleSheet, StatusBar, View, Text} from 'react-native';
import {Router, Scene, Stack, Tabs, Modal} from 'react-native-router-flux';
import {
  type ViewStyleProp,
  type TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

// Store w/ Redux
import {Provider, connect} from 'react-redux';
import configureStore from './store/configureStore';

import PlayerTabBar from './components/PlayerTabBar';

//Legal
import TermsServiceView from './containers/TermsServiceView';
import PrivacyPolicyView from './containers/PrivacyPolicyView';

// Welcome
import WelcomeView from './containers/WelcomeView';

// Tabs
import LibraryTabView from './containers/LibraryTabView';
import ExploreTabView from './containers/ExploreTabView';
import SearchTabView from './containers/SearchTabView';
import SocialTabView from './containers/SocialTabView';
import UserProfileView from './containers/UserProfileView';

// Library
import LibraryPlaylistsView from './containers/LibraryPlaylistsView';
import PlaylistView from './containers/PlaylistView';
import LibraryArtistsView from './containers/LibraryArtistsView';
import LibrarySingleArtistView from './containers/LibrarySingleArtistView';
import LibraryAlbumsView from './containers/LibraryAlbumsView';
import LibrarySingleAlbumView from './containers/LibrarySingleAlbumView';
import LibraryTracksView from './containers/LibraryTracksView';
import RecentlyPlayedView from './containers/RecentlyPlayedView';
import TopPlaylistsView from './containers/TopPlaylistsView';
import MostPlayedView from './containers/MostPlayedView';
import AddToPlaylistView from './containers/AddToPlaylistView';
import NewPlaylistNameView from './containers/NewPlaylistNameView';
import AlbumDetailsView from './containers/AlbumDetailsView';
import ArtistDetailsView from './containers/ArtistDetailsView';
import PlaylistDetailsView from './containers/PlaylistDetailsView';

// Session
import LiveSessionView from './containers/LiveSessionView';
import AddMusicView from './containers/AddMusicView';
import LiveSettingsView from './containers/LiveSettingsView';

// Search
import RecentSearchesView from './containers/RecentSearchesView';
import SearchedUsersView from './containers/SearchedUsersView';
import SearchedTracksView from './containers/SearchedTracksView';
import SearchedPlaylistsView from './containers/SearchedPlaylistsView';
import SearchedArtistsView from './containers/SearchedArtistsView';
import SearchedAlbumsView from './containers/SearchedAlbumsView';
import SearchedGroupsView from './containers/SearchedGroupsView';

// Social - Notifications
import SocialNewFollowersView from './containers/SocialNewFollowersView';
import SocialTrackLikesView from './containers/SocialTrackLikesView';
import SocialLiveFriendsView from './containers/SocialLiveFriendsView';
import SocialAddedTracksView from './containers/SocialAddedTracksView';

// Social - Messages
import NewMessageView from './containers/NewMessageView';
import AddMembersView from './containers/AddMembersView';

// Profile
import EditProfileView from './containers/EditProfileView';
import UserFollowersView from './containers/UserFollowersView';
import UserFollowingView from './containers/UserFollowingView';
import UserGroupsView from './containers/UserGroupsView';

// Settings
import UserSettingsView from './containers/UserSettingsView';
import UserNotificationsView from './containers/UserNotificationsView';
import UserPreferencesView from './containers/UserPreferencesView';
import DisplaySoundView from './containers/DisplaySoundView';
import AboutAppView from './containers/AboutAppView';
import LanguageRegionView from './containers/LanguageRegionView';
import ReportProblemView from './containers/ReportProblemView';
import ReportUserView from './containers/ReportUserView';

type Props = {};

interface Styles {
  tabbar: ViewStyleProp,
};

const RouterWithRedux = connect()(Router);
const store = configureStore();
const styles: Styles = StyleSheet.create({
  tabbar: {},
});

export default class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    // @see: https://github.com/facebook/react-native/issues/9599
    if (typeof global.self === 'undefined') global.self = global;
  }

  render() {
    StatusBar.setBarStyle('light-content', true);

    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Modal>
            <Scene key='welcome' hideNavBar>
              <Scene
                key='welcomeMain'
                type='jump'
                component={WelcomeView}
                title='Welcome'
                initial
              >
              </Scene>
              <Scene
                key='welcomeTermsOfService'
                component={TermsServiceView}
                title='Terms of Service'
              >
              </Scene>
              <Scene
                key='welcomePrivacyPolicy'
                component={PrivacyPolicyView}
                title='Privacy Policy'
              >
              </Scene>
              <Scene
                key='createProfile'
                component={EditProfileView}
                title='Create Profile'
              >
              </Scene>
            </Scene>
            <Scene key='root' hideNavBar>
              <Tabs
                key='tabbar'
                initial
                lazy={true}
                showLabel={false}
                tabBarPosition='bottom'
                tabBarStyle={styles.tabbar}
                tabBarComponent={PlayerTabBar}
                swipeEnabled={false}
              >
                <Stack
                  key='library'
                  initial
                  hideNavBar
                  tabBarLabel='Library'
                >
                  <Scene
                    key='libraryMain'
                    initial
                    component={LibraryTabView}
                    title='Library'
                  />
                  <Scene
                    key='libraryPlaylists'
                    component={LibraryPlaylistsView}
                    title='Library'
                  />
                  <Scene
                    key='librarySinglePlaylist'
                    component={PlaylistView}
                    title='Library'
                  />
                  <Scene
                    key='libraryPlaylistDetails'
                    component={PlaylistDetailsView}
                    title='Library'
                  />
                  <Scene
                    key='libraryArtists'
                    component={LibraryArtistsView}
                    title='Library'
                  />
                  <Scene
                    key='librarySingleArtist'
                    component={LibrarySingleArtistView}
                    title='Library'
                  />
                  <Scene
                    key='libraryArtistDetails'
                    component={ArtistDetailsView}
                    title='Library'
                  />
                  <Scene
                    key='libraryAlbums'
                    component={LibraryAlbumsView}
                    title='Library'
                  />
                  <Scene
                    key='librarySingleAlbum'
                    component={LibrarySingleAlbumView}
                    title='Library'
                  />
                  <Scene
                    key='libraryAlbumDetails'
                    component={AlbumDetailsView}
                    title='Library'
                  />
                  <Scene
                    key='libraryTracks'
                    component={LibraryTracksView}
                    title='Library'
                  />
                  <Scene
                    key='libraryRecentlyPlayed'
                    component={RecentlyPlayedView}
                    title='Library'
                  />
                  <Scene
                    key='libraryTopPlaylists'
                    component={TopPlaylistsView}
                    title='Library'
                  />
                  <Scene
                    key='libraryMostPlayed'
                    component={MostPlayedView}
                    title='Library'
                  />
                  <Scene
                    key='libraryNewPlaylist'
                    component={NewPlaylistNameView}
                    title='Library'
                  />
                  <Scene
                    key='libraryAddMembers'
                    component={AddMembersView}
                    title='Library'
                  />
                  <Scene
                    key='libraryFollowers'
                    component={UserFollowersView}
                    title='Library'
                  />
                  <Scene
                    key='libraryFollowing'
                    component={UserFollowingView}
                    title='Library'
                  />
                  <Scene
                    key='libraryReportUser'
                    component={ReportUserView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileMain'
                    component={UserProfileView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileFollowers'
                    component={UserFollowersView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileFollowing'
                    component={UserFollowingView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileRecentlyPlayed'
                    component={RecentlyPlayedView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileMostPlayed'
                    component={MostPlayedView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileGroups'
                    component={UserGroupsView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileEditProfile'
                    component={EditProfileView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileSettings'
                    component={UserSettingsView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileNotifications'
                    component={UserNotificationsView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfilePreferences'
                    component={UserPreferencesView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileDisplaySound'
                    component={DisplaySoundView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileLanguageRegion'
                    component={LanguageRegionView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileAboutApp'
                    component={AboutAppView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileReportProblem'
                    component={ReportProblemView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileReportUser'
                    component={ReportUserView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfileTermsService'
                    component={TermsServiceView}
                    title='Library'
                  />
                  <Scene
                    key='libraryProfilePrivacyPolicy'
                    component={PrivacyPolicyView}
                    title='Library'
                  />
                </Stack>
                <Stack
                  key='explore'
                  hideNavBar
                  tabBarLabel='Explore'
                >
                  <Scene
                    key='exploreMain'
                    initial
                    component={ExploreTabView}
                    title='Explore'
                  />
                  <Scene
                    key='exploreFollowers'
                    component={UserFollowersView}
                    title='Explore'
                  />
                  <Scene
                    key='exploreFollowing'
                    component={UserFollowingView}
                    title='Explore'
                  />
                  <Scene
                    key='exploreReportUser'
                    component={ReportUserView}
                    title='Explore'
                  />
                </Stack>
                <Stack
                  key='search'
                  hideNavBar
                  tabBarLabel='Search'
                >
                  <Scene
                    key='searchMain'
                    initial
                    component={SearchTabView}
                    title='Search'
                  />
                  <Scene
                    key='searchRecent'
                    component={RecentSearchesView}
                    title='Search'
                  />
                  <Scene
                    key='searchUsers'
                    component={SearchedUsersView}
                    title='Search'
                  />
                  <Scene
                    key='searchTracks'
                    component={SearchedTracksView}
                    title='Search'
                  />
                  <Scene
                    key='searchPlaylists'
                    component={SearchedPlaylistsView}
                    title='Search'
                  />
                  <Scene
                    key='searchArtists'
                    component={SearchedArtistsView}
                    title='Search'
                  />
                  <Scene
                    key='searchAlbums'
                    component={SearchedAlbumsView}
                    title='Search'
                  />
                  <Scene
                    key='searchGroups'
                    component={SearchedGroupsView}
                    title='Search'
                  />
                  <Scene
                    key='searchFollowers'
                    component={UserFollowersView}
                    title='Search'
                  />
                  <Scene
                    key='searchFollowing'
                    component={UserFollowingView}
                    title='Search'
                  />
                  <Scene
                    key='searchReportUser'
                    component={ReportUserView}
                    title='Search'
                  />
                </Stack>
                <Stack
                  key='social'
                  hideNavBar
                  tabBarLabel='Social'
                >
                  <Scene
                    key='socialMain'
                    initial
                    component={SocialTabView}
                    title='Social'
                  />
                  <Scene
                    key='socialNewFollowers'
                    component={SocialNewFollowersView}
                    title='Social'
                  />
                  <Scene
                    key='socialTrackLikes'
                    component={SocialTrackLikesView}
                    title='Social'
                  />
                  <Scene
                    key='socialLiveFriends'
                    component={SocialLiveFriendsView}
                    title='Social'
                  />
                  <Scene
                    key='socialAddedTracks'
                    component={SocialAddedTracksView}
                    title='Social'
                  />
                  <Scene
                    key='socialNewMessage'
                    component={NewMessageView}
                    title='Social'
                  />
                  <Scene
                    key='socialNewGroup'
                    component={AddMembersView}
                    title='Social'
                  />
                  <Scene
                    key='socialFollowers'
                    component={UserFollowersView}
                    title='Social'
                  />
                  <Scene
                    key='socialFollowing'
                    component={UserFollowingView}
                    title='Social'
                  />
                  <Scene
                    key='socialReportUser'
                    component={ReportUserView}
                    title='Social'
                  />
                </Stack>
                <Stack
                  key='profile'
                  hideNavBar
                  tabBarLabel='Profile'
                >
                  <Scene
                    key='profileMain'
                    initial
                    component={UserProfileView}
                    title='Profile'
                  />
                  <Scene
                    key='profileUser'
                    component={UserProfileView}
                    title='Profile'
                  />
                  <Scene
                    key='profileFollowers'
                    component={UserFollowersView}
                    title='Profile'
                  />
                  <Scene
                    key='profileFollowing'
                    component={UserFollowingView}
                    title='Profile'
                  />
                  <Scene
                    key='profileRecentlyPlayed'
                    component={RecentlyPlayedView}
                    title='Profile'
                  />
                  <Scene
                    key='profileTopPlaylists'
                    component={TopPlaylistsView}
                    title='Profile'
                  />
                  <Scene
                    key='profileSinglePlaylist'
                    component={PlaylistView}
                    title='Profile'
                  />
                  <Scene
                    key='profilePlaylistDetails'
                    component={PlaylistDetailsView}
                    title='Profile'
                  />
                  <Scene
                    key='profileMostPlayed'
                    component={MostPlayedView}
                    title='Profile'
                  />
                  <Scene
                    key='profileGroups'
                    component={UserGroupsView}
                    title='Profile'
                  />
                  <Scene
                    key='profileEditProfile'
                    component={EditProfileView}
                    title='Profile'
                  />
                  <Scene
                    key='profileSettings'
                    component={UserSettingsView}
                    title='Profile'
                  />
                  <Scene
                    key='profileNotifications'
                    component={UserNotificationsView}
                    title='Profile'
                  />
                  <Scene
                    key='profilePreferences'
                    component={UserPreferencesView}
                    title='Profile'
                  />
                  <Scene
                    key='profileDisplaySound'
                    component={DisplaySoundView}
                    title='Profile'
                  />
                  <Scene
                    key='profileLanguageRegion'
                    component={LanguageRegionView}
                    title='Profile'
                  />
                  <Scene
                    key='profileAboutApp'
                    component={AboutAppView}
                    title='Profile'
                  />
                  <Scene
                    key='profileReportProblem'
                    component={ReportProblemView}
                    title='Profile'
                  />
                  <Scene
                    key='profileReportUser'
                    component={ReportUserView}
                    title='Profile'
                  />
                  <Scene
                    key='profileTermsService'
                    component={TermsServiceView}
                    title='Profile'
                  />
                  <Scene
                    key='profilePrivacyPolicy'
                    component={PrivacyPolicyView}
                    title='Profile'
                  />
                </Stack>
              </Tabs>
            </Scene>
            <Scene
              key='addToPlaylist'
              component={AddToPlaylistView}
              title='Add to Playlist'
              hideNavBar
            />
            <Stack
              key='liveSession'
              title='Live Session'
              hideNavBar
            >
              <Scene
                key='liveSessionMain'
                initial
                component={LiveSessionView}
                title='Live Session'
                hideNavBar
              />
              <Scene
                key='liveSettings'
                component={LiveSettingsView}
                title='Live Session'
                hideNavBar
              />
            </Stack>
            <Stack
              key='addSessionTrack'
              title='Add Track'
              hideNavBar
            >
              <Scene
                key='addSessionTrackMain'
                component={AddMusicView}
                title='Add Track'
                initial
              />
            </Stack>
          </Modal>
        </RouterWithRedux>
      </Provider>
    );
  }
}