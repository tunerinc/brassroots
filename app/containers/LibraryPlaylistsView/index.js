'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
  VirtualizedList
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import debounce from "lodash.debounce";
import styles from './styles';

// Components
import PlaylistCard from '../../components/PlaylistCard';
import LoadingPlaylist from '../../components/LoadingPlaylist';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Playlists Action Creators
import {getPlaylists} from '../../actions/playlists/GetPlaylists';

class LibraryPlaylistsView extends React.Component {
  constructor(props) {
    super(props);
    
    this.onScroll = this.onScroll.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);

    this.shadowOpacity = new Animated.Value(0);

    this._onEndReached = debounce(this.onEndReached, 1000);
  }

  componentDidMount() {
    const {getPlaylists, playlists: {userPlaylists}, users: {currentUserID}} = this.props;

    if (!userPlaylists.length) {
      getPlaylists(currentUserID, true, 0);
    }
  }

  navToPlaylist = (dest, playlistID) => () => {
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

  onScroll({nativeEvent: {contentOffset: {y}}}) {
    if (y > 0) {
      if (this.shadowOpacity !== 0.9) {
        Animated.timing(this.shadowOpacity, {
          toValue: 0.9,
          duration: 75,
          easing: Easing.linear,
        }).start();
      };
    } else {
      Animated.timing(this.shadowOpacity, {
        toValue: 0,
        duration: 75,
        easing: Easing.linear,
      }).start()
    }
  }

  renderPlaylist({item}) {
    const {
      playlists: {playlistsByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {small, name, members, mode, ownerID} = playlistsByID[item];
    const ownerName = ownerID === 'spotify'
      ? 'Spotify'
      : ownerID !== currentUserID
      ? usersByID[ownerID].displayName
      : null;

    return (
      <PlaylistCard
        key={item}
        image={small}
        isMember={members.includes(currentUserID) || ownerID === currentUserID}
        name={name}
        navToPlaylist={this.navToPlaylist('library', item)}
        mode={mode}
        ownerName={ownerName}
      />
    );
  }

  renderFooter() {
    const {playlists: {fetchingPlaylists, refreshingPlaylists}} = this.props;

    if (!fetchingPlaylists || refreshingPlaylists) return null;

    return <LoadingPlaylist />;
  }

  renderCreateButton() {
    return (
      <TouchableOpacity style={styles.addButton} onPress={Actions.libraryNewPlaylist}>
        <Text style={styles.addButtonText}>CREATE PLAYLIST</Text>
      </TouchableOpacity>
    );
  }

  onEndReached = () => {
    const {
      getPlaylists,
      playlists: {fetchingPlaylists, userPlaylists, canPaginate},
      users: {currentUserID},
    } = this.props;

    if (fetchingPlaylists || !canPaginate) return;

    getPlaylists(currentUserID, false, userPlaylists.length);
  }

  handleRefresh() {
    const {
      getPlaylists,
      playlists: {refreshingPlaylists},
      users: {currentUserID},
    } = this.props;

    if (refreshingPlaylists) return;

    getPlaylists(currentUserID, true, 0);
  }

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.shadowOpacity};
    const {
      playlists: {userPlaylists, refreshingPlaylists, fetchingPlaylists, error: playlistError},
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <Ionicons
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={Actions.pop}
            />
            <Text style={styles.title}>Playlists</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        {userPlaylists.length !== 0 &&
          <VirtualizedList
            data={userPlaylists}
            extraData={this.props}
            style={styles.scrollContainer}
            renderItem={this.renderPlaylist}
            keyExtractor={item => item}
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
            removeClippedSubviews={false}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            ListHeaderComponent={this.renderCreateButton}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={<Text>Nothing to show</Text>}
            refreshing={refreshingPlaylists}
            onRefresh={this.handleRefresh}
            onEndReached={this._onEndReached}
          />
        }
        {(userPlaylists.length === 0 || !userPlaylists.length) &&
          <View style={styles.playlistsWrap}>
            {fetchingPlaylists &&
              <View>
                {this.renderCreateButton()}
                <LoadingPlaylist />
                <LoadingPlaylist />
                <LoadingPlaylist />
                <LoadingPlaylist />
                <LoadingPlaylist />
                <LoadingPlaylist />
              </View>
            }
            {(!fetchingPlaylists && !playlistError) && <Text>Nothing to show</Text>}
            {(!fetchingPlaylists && playlistError) && <Text>There was an error.</Text>}
          </View>
        }
      </View>
    );
  }
}

LibraryPlaylistsView.propTypes = {
  getPlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.object.isRequired,
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
    getPlaylists,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPlaylistsView);