'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Animated, Easing, VirtualizedList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Components
import PlaylistCard from '../../components/PlaylistCard';
import LoadingPlaylist from '../../components/LoadingPlaylist';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Playlists Action Creators
import {getTopPlaylists} from '../../actions/playlists/GetTopPlaylists';

class TopPlaylistsView extends React.Component {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);

    this.shadowOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    const {
      getTopPlaylists,
      selectedUser,
      users: {currentUserID, usersByID},
    } = this.props;
    const userID = selectedUser || currentUserID;
    const {topPlaylists} = usersByID[userID];

    if (!topPlaylists.length) {
      getTopPlaylists(userID);
    }
  }

  refresh() {
    const {
      getTopPlaylists,
      selectedUser,
      playlists: {refreshingPlaylists},
      users: {currentUserID},
    } = this.props;
    const userID = selectedUser || currentUserID;

    if (refreshingPlaylists) return;

    getTopPlaylists(userID);
  }

  onScroll({nativeEvent: {contentOffset: {y}}}) {
    if ((y > 0 && this.shadowOpacity === 0) || (y <= 0 && this.shadowOpacity === 0.9)) {
      Animated.timing(
        this.shadowOpacity,
        {
          toValue: y > 0 ? 0.9 : 0,
          duration: 230,
          easing: Easing.linear,
        }
      ).start();
    }
  }

  navToPlaylist(dest, playlistID) {
    switch (dest) {
      case 'library':
        Actions.librarySinglePlaylist({playlistToView: playlistID});
        return;
      case 'profile':
        Actions.profileSinglePlaylist({playlistToView: playlistID});
        return;
      default:
        return;
    }
  }

  renderPlaylist({item}) {
    const {
      playlists: {playlistsByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {image, name, members, mode, ownerID, ownerType} = playlistsByID[item];
    const ownerName = ownerID === 'spotify'
      ? 'Spotify'
      : ownerID !== currentUserID
      ? usersByID[ownerID].displayName
      : null;

    return (
      <PlaylistCard
        key={item}
        image={image}
        isMember={members.indexOf(currentUserID) !== -1}
        name={name}
        navToPlaylist={this.navToPlaylist(title.toLowerCase(), item)}
        mode={mode}
        ownerName={ownerName}
      />
    );
  }

  render() {
    const animatedHeaderStyle = { shadowOpacity: this.shadowOpacity };
    const {
      selectedUser,
      playlists: {fetchingTopPlaylists, error: playlistError},
      users: {currentUserID, usersByID},
    } = this.props;
    const userID = selectedUser || currentUserID;
    const {topPlaylists} = usersByID[userID];

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <Ionicons
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={this.navBack}
            />
            <Text style={styles.title}>Top Playlists</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        {topPlaylists.length !== 0 &&
          <VirtualizedList
            data={topPlaylists}
            extraData={this.props}
            renderItem={this.renderTrack}
            keyExtractor={item => item}
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
            ListFooterComponent={<View style={{height: 20}}></View>}
            removeClippedSubviews={false}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>Nothing to show</Text>}
            refreshing={refreshingPlaylists}
            onRefresh={this.refresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.7}
          />
        }
        {topPlaylists.length === 0 &&
          <View style={styles.topPlaylistsWrap}>
            {(!fetchingTopPlaylists && !playlistError) && <Text>Nothing to show</Text>}
            {(!fetchingTopPlaylists && playlistError) && <Text>There was an error</Text>}
            {fetchingTopPlaylists &&
              <View>
                <LoadingPlaylist />
                <LoadingPlaylist />
                <LoadingPlaylist />
                <LoadingPlaylist />
                <LoadingPlaylist />
              </View>
            }
          </View>
        }
      </View>
    );
  }
}

TopPlaylistsView.propTypes = {
  getTopPlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.object.isRequired,
  selectedUser: PropTypes.string,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({playlists, users}) {
  return {
    playlists,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getTopPlaylists,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopPlaylistsView);