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

    this.state = {
      shadowOpacity: new Animated.Value(0),
    };

    this.refresh = this.refresh.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
  }

  componentDidMount() {
    const {
      getTopPlaylists,
      selectedUser,
      entities: {users},
      users: {currentUserID},
    } = this.props;
    const userID = selectedUser || currentUserID;
    const {topPlaylists} = users.byID[userID];

    if (!topPlaylists.length) getTopPlaylists(userID);
  }

  refresh() {
    const {
      getTopPlaylists,
      selectedUser,
      playlists: {refreshing},
      users: {currentUserID},
    } = this.props;
    const userID = selectedUser || currentUserID;

    if (!refreshing) getTopPlaylists(userID);
  }

  onScroll({nativeEvent: {contentOffset: {y}}}) {
    const {shadowOpacity} = this.state;

    if (y > 0) {
      if (shadowOpacity != 0.9) {
        Animated.timing(shadowOpacity, {
          toValue: 0.9,
          duration: 75,
          easing: Easing.linear,
        }).start();
      };
    } else {
      Animated.timing(shadowOpacity, {
        toValue: 0,
        duration: 75,
        easing: Easing.linear,
      }).start()
    }
  }

  navToPlaylist(dest, playlistID) {
    if (dest === 'library') Actions.libSinglePlaylist({playlistToView: playlistID});
    if (dest === 'profile') Actions.proSinglePlaylist({playlistToView: playlistID});
  }

  renderPlaylist({item}) {
    const {
      entities: {playlists, users},
      users: {currentUserID},
    } = this.props;
    const {image, name, members, mode, ownerID, ownerType} = playlists.byID[item];
    const ownerName = ownerID === 'spotify'
      ? 'Spotify'
      : ownerID !== currentUserID
      ? users.byID[ownerID].displayName
      : null;

    return (
      <PlaylistCard
        key={item}
        image={image}
        isMember={members.includes(currentUserID)}
        name={name}
        navToPlaylist={this.navToPlaylist(title.toLowerCase(), item)}
        mode={mode}
        ownerName={ownerName}
      />
    );
  }

  render() {
    const {shadowOpacity} = this.state;
    const {
      selectedUser,
      entities: {users},
      playlists: {fetching, refreshing, error},
      users: {currentUserID},
    } = this.props;
    const userID = selectedUser || currentUserID;
    const {topPlaylists} = users.byID[userID];

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={this.navBack} />
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
            refreshing={refreshing}
            onRefresh={this.refresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.7}
          />
        }
        {topPlaylists.length === 0 &&
          <View style={styles.topPlaylistsWrap}>
            {(!fetching.includes('topPlaylists') && !error) && <Text>Nothing to show</Text>}
            {(!fetching.includes('topPlaylists') && error) && <Text>There was an error</Text>}
            {fetching.includes('topPlaylists') &&
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
  entities: PropTypes.object.isRequired,
  getTopPlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.object.isRequired,
  selectedUser: PropTypes.string,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({entities, playlists, users}) {
  return {
    entities,
    playlists,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getTopPlaylists}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopPlaylistsView);