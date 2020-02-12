'use strict';

/**
 * @format
 * @flow
 */

// React
import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {Router, Scene, Stack, Tabs, Modal} from 'react-native-router-flux';
import {type ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

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
  tabbar: ViewStyleProp;
}

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
            <Scene key="welcome" hideNavBar>
              <Scene key="welcomeMain" type="jump" component={WelcomeView} title="Welcome" initial />
              <Scene key="welTermsService" component={TermsServiceView} title="Terms of Service" />
              <Scene key="welPrivacyPolicy" component={PrivacyPolicyView} title="Privacy Policy" />
              <Scene key="createProfile" component={EditProfileView} title="Create Profile" />
            </Scene>
            <Scene key="root" hideNavBar>
              <Tabs
                key="tabbar"
                initial
                lazy={true}
                showLabel={false}
                tabBarPosition="bottom"
                tabBarStyle={styles.tabbar}
                tabBarComponent={PlayerTabBar}
                swipeEnabled={false}
              >
                <Stack key="library" initial hideNavBar tabBarLabel="Library">
                  <Scene key='libMain' initial component={LibraryTabView} title='Library' />
                  <Scene key='libPlaylists' component={LibraryPlaylistsView} title='Library' />
                  <Scene key='libSinglePlaylist' component={PlaylistView} title='Library' />
                  <Scene key='libPlaylistDetails' component={PlaylistDetailsView} title='Library' />
                  <Scene key='libArtistDetails' component={ArtistDetailsView} title='Library' />
                  <Scene key='libAlbums' component={LibraryAlbumsView} title='Library' />
                  <Scene key='libSingleAlbum' component={LibrarySingleAlbumView} title='Library' />
                  <Scene key='libAlbumDetails' component={AlbumDetailsView} title='Library' />
                  <Scene key='libTracks' component={LibraryTracksView} title='Library' />
                  <Scene key='libRecentlyPlayed' component={RecentlyPlayedView} title='Library' />
                  <Scene key='libTopPlaylists' component={TopPlaylistsView} title='Library' />
                  <Scene key='libMostPlayed' component={MostPlayedView} title='Library' />
                  <Scene key='libNewPlaylist' component={NewPlaylistNameView} title='Library' />
                  <Scene key='libAddMembers' component={AddMembersView} title='Library' />
                  <Scene key='libFollowers' component={UserFollowersView} title='Library' />
                  <Scene key='libFollowing' component={UserFollowingView} title='Library' />
                  <Scene key='libReportUser' component={ReportUserView} title='Library' />
                  <Scene key='libProMain' component={UserProfileView} title='Library' />
                  <Scene key='libProFollowers' component={UserFollowersView} title='Library' />
                  <Scene key='libProFollowing' component={UserFollowingView} title='Library' />
                  <Scene key='libProRecentlyPlayed' component={RecentlyPlayedView} title='Library' />
                  <Scene key='libProMostPlayed' component={MostPlayedView} title='Library' />
                  <Scene key='libProGroups' component={UserGroupsView} title='Library' />
                  <Scene key='libProEditProfile' component={EditProfileView} title='Library' />
                  <Scene key='libProSettings' component={UserSettingsView} title='Library' />
                  <Scene key='libProNotif' component={UserNotificationsView} title='Library' />
                  <Scene key='libProPreferences' component={UserPreferencesView} title='Library' />
                  <Scene key='libProDisplaySound' component={DisplaySoundView} title='Library' />
                  <Scene key='libProLanguageRegion' component={LanguageRegionView} title='Library' />
                  <Scene key='libProAboutApp' component={AboutAppView} title='Library' />
                  <Scene key='libProReportProblem' component={ReportProblemView} title='Library' />
                  <Scene key='libProReportUser' component={ReportUserView} title='Library' />
                  <Scene key='libProTermsService' component={TermsServiceView} title='Library' />
                  <Scene key='libProPrivacyPolicy' component={PrivacyPolicyView} title='Library' />
                </Stack>
                <Stack key='explore' hideNavBar tabBarLabel='Explore'>
                  <Scene key='exploreMain' initial component={ExploreTabView} title='Explore' />
                  <Scene key='exploreFollowers' component={UserFollowersView} title='Explore' />
                  <Scene key='exploreFollowing' component={UserFollowingView} title='Explore' />
                  <Scene key='exploreReportUser' component={ReportUserView} title='Explore' />
                </Stack>
                <Stack key='search' hideNavBar tabBarLabel='Search'>
                  <Scene key='searchMain' initial component={SearchTabView} title='Search' />
                  <Scene key='searchRecent' component={RecentSearchesView} title='Search' />
                  <Scene key='searchUsers' component={SearchedUsersView} title='Search' />
                  <Scene key='searchTracks' component={SearchedTracksView} title='Search' />
                  <Scene key='searchPlaylists' component={SearchedPlaylistsView} title='Search' />
                  <Scene key='searchArtists' component={SearchedArtistsView} title='Search' />
                  <Scene key='searchAlbums' component={SearchedAlbumsView} title='Search' />
                  <Scene key='searchGroups' component={SearchedGroupsView} title='Search' />
                  <Scene key='searchFollowers' component={UserFollowersView} title='Search' />
                  <Scene key='searchFollowing' component={UserFollowingView} title='Search' />
                  <Scene key='searchReportUser' component={ReportUserView} title='Search' />
                </Stack>
                <Stack key='social' hideNavBar tabBarLabel='Social'>
                  <Scene key='socMain' initial component={SocialTabView} title='Social' />
                  <Scene key='socNewFollowers' component={SocialNewFollowersView} title='Social' />
                  <Scene key='socTrackLikes' component={SocialTrackLikesView} title='Social' />
                  <Scene key='socLiveFriends' component={SocialLiveFriendsView} title='Social' />
                  <Scene key='socAddedTracks' component={SocialAddedTracksView} title='Social' />
                  <Scene key='socNewMessage' component={NewMessageView} title='Social' />
                  <Scene key='socNewGroup' component={AddMembersView} title='Social' />
                  <Scene key='socFollowers' component={UserFollowersView} title='Social' />
                  <Scene key='socFollowing' component={UserFollowingView} title='Social' />
                  <Scene key='socReportUser' component={ReportUserView} title='Social' />
                </Stack>
                <Stack key='profile' hideNavBar tabBarLabel='Profile'>
                  <Scene key='proMain' initial component={UserProfileView} title='Profile' />
                  <Scene key='proUser' component={UserProfileView} title='Profile' />
                  <Scene key='proFollowers' component={UserFollowersView} title='Profile' />
                  <Scene key='proFollowing' component={UserFollowingView} title='Profile' />
                  <Scene key='proRecentlyPlayed' component={RecentlyPlayedView} title='Profile' />
                  <Scene key='proTopPlaylists' component={TopPlaylistsView} title='Profile' />
                  <Scene key='proSinglePlaylist' component={PlaylistView} title='Profile' />
                  <Scene key='proPlaylistDetails' component={PlaylistDetailsView} title='Profile' />
                  <Scene key='proMostPlayed' component={MostPlayedView} title='Profile' />
                  <Scene key='proGroups' component={UserGroupsView} title='Profile' />
                  <Scene key='proEditProfile' component={EditProfileView} title='Profile' />
                  <Scene key='proSettings' component={UserSettingsView} title='Profile' />
                  <Scene key='proNotifications' component={UserNotificationsView} title='Profile' />
                  <Scene key='proPreferences' component={UserPreferencesView} title='Profile' />
                  <Scene key='proDisplaySound' component={DisplaySoundView} title='Profile' />
                  <Scene key='proLanguageRegion' component={LanguageRegionView} title='Profile' />
                  <Scene key='proAboutApp' component={AboutAppView} title='Profile' />
                  <Scene key='proReportProblem' component={ReportProblemView} title='Profile' />
                  <Scene key='proReportUser' component={ReportUserView} title='Profile' />
                  <Scene key='proTermsService' component={TermsServiceView} title='Profile' />
                  <Scene key='proPrivacyPolicy' component={PrivacyPolicyView} title='Profile' />
                </Stack>
              </Tabs>
            </Scene>
            <Scene
              key='addToPlaylist'
              component={AddToPlaylistView}
              title='Add to Playlist'
              hideNavBar
            />
            <Stack key='liveSession' title='Live Session' hideNavBar>
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
            <Stack key='addSessionTrack' title='Add Track' hideNavBar>
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