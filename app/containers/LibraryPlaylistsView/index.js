'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
  VirtualizedList,
  InteractionManager,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import debounce from "lodash.debounce";
import styles from './styles';

// Components
import PlaylistCard from '../../components/PlaylistCard';
import LoadingPlaylist from '../../components/LoadingPlaylist';

// Playlists Action Creators
import {getPlaylists} from '../../actions/playlists/GetPlaylists';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

class LibraryPlaylistsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shadowOpacity: new Animated.Value(0),
    };
    
    this.onScroll = this.onScroll.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderCreateButton = this.renderCreateButton.bind(this);

    this._onEndReached = debounce(this.onEndReached, 0);
  }

  componentDidMount() {
    const {getPlaylists, playlists: {userPlaylists}, users: {currentUserID}} = this.props;

    InteractionManager.runAfterInteractions(() => {
      if (!userPlaylists.length) getPlaylists(currentUserID, true, 0);
    });
  }

  navBack = () => InteractionManager.runAfterInteractions(Actions.pop);

  navToPlaylist = (dest, playlistID) => () => {
    InteractionManager.runAfterInteractions(() => {
      if (dest === 'library') {
        Actions.libSinglePlaylist({playlistToView: playlistID});
      }
  
      if (dest === 'profile') {
        Actions.proSinglePlaylist({playlistToView: playlistID});
      }
    });
  }

  createPlaylist = () => InteractionManager.runAfterInteractions(Actions.libNewPlaylist);

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

  renderPlaylist({item}) {
    const {
      entities: {playlists, users},
      users: {currentUserID},
    } = this.props;
    const {medium, name, members, mode, ownerID} = playlists.byID[item];
    const ownerName = ownerID === 'spotify'
      ? 'Spotify'
      : ownerID !== currentUserID
      ? users.byID[ownerID].displayName
      : null;

    return (
      <PlaylistCard
        key={item}
        image={medium}
        isMember={members.includes(currentUserID) || ownerID === currentUserID}
        name={name}
        navToPlaylist={this.navToPlaylist('library', item)}
        mode={mode}
        ownerName={ownerName}
      />
    );
  }

  renderFooter() {
    const {playlists: {fetching, refreshing, userPlaylists, totalUserPlaylists}} = this.props;

    if (
      !fetching.includes('playlists')
      || refreshing.includes('playlists')
      || !userPlaylists.length
    ) return <View></View>;

    return (
      <View style={styles.footer}>
        <FastImage style={styles.loadingGif} source={require('../../images/loading.gif')} />
      </View>
    );
  }

  renderCreateButton() {
    return (
      <TouchableOpacity style={styles.addButton} onPress={this.createPlaylist}>
        <Text style={styles.addButtonText}>CREATE PLAYLIST</Text>
      </TouchableOpacity>
    );
  }

  onEndReached = () => {
    const {
      getPlaylists,
      playlists: {fetching, userPlaylists, totalUserPlaylists},
      users: {currentUserID},
    } = this.props;

    if (
      fetching.includes('playlists')
      || !userPlaylists.length
      || userPlaylists.length === totalUserPlaylists
    ) return;

    getPlaylists(currentUserID, false, userPlaylists.length);
  }

  handleRefresh() {
    const {
      getPlaylists,
      playlists: {refreshing},
      users: {currentUserID},
    } = this.props;

    if (!refreshing.includes('playlists')) getPlaylists(currentUserID, true, 0);
  }

  render() {
    const {shadowOpacity} = this.state;
    const {playlists: {userPlaylists, refreshing, fetching, error: playlistError}} = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={this.navBack} />
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
            refreshing={refreshing.includes('playlists')}
            onRefresh={this.handleRefresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.5}
          />
        }
        {(userPlaylists.length === 0 || !userPlaylists.length) &&
          <View style={styles.playlistsWrap}>
            {(!fetching.includes('playlists') && !playlistError) && <Text>Nothing to show</Text>}
            {(!fetching.includes('playlists') && playlistError) && <Text>There was an error.</Text>}
            {fetching.includes('playlists') &&
              <View>
                {this.renderCreateButton()}
                <LoadingPlaylist />
                <LoadingPlaylist />
                <LoadingPlaylist />
                <LoadingPlaylist />
                <LoadingPlaylist />
                <LoadingPlaylist />
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

LibraryPlaylistsView.propTypes = {
  entities: PropTypes.object.isRequired,
  getPlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.object.isRequired,
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
  return bindActionCreators({getPlaylists}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPlaylistsView);