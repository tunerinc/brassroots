'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {Text, View, TouchableOpacity, ActivityIndicator, VirtualizedList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {onScroll} from 'react-native-redash';
import Animated from 'react-native-reanimated';
import debounce from "lodash.debounce";
import moment from 'moment';

// Styles
import styles from './styles';

// Components
import PlaylistCard from '../../components/PlaylistCard';
import LoadingPlaylist from '../../components/LoadingPlaylist';

// Playlists Action Creators
import {getPlaylists} from '../../actions/playlists/GetPlaylists';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);
const {Value, interpolate, Extrapolate} = Animated;

class LibraryPlaylistsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      y: new Value(0),
    };
    
    this.renderPlaylist = this.renderPlaylist.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);

    this._onEndReached = debounce(this.onEndReached, 0);
  }

  componentDidMount() {
    const {
      getPlaylists,
      playlists: {userPlaylists, lastUpdated},
      users: {currentUserID},
    } = this.props;
    const last = moment(lastUpdated, 'ddd, MMM D, YYYY, h:mm:ss a');
    const timeDiff = moment().diff(last, 'minutes', true);

    if (!userPlaylists.length || timeDiff >= 1) {
      setTimeout(() => getPlaylists(currentUserID, true, 0), 100);
    }
  }

  navToPlaylist = (dest, playlistID) => () => {
    if (dest === 'library') {
      Actions.libSinglePlaylist({playlistToView: playlistID});
    }

    if (dest === 'profile') {
      Actions.proSinglePlaylist({playlistToView: playlistID});
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
      <TouchableOpacity style={styles.addButton} onPress={Actions.libNewPlaylist}>
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
    const {y} = this.state;
    const {playlists: {userPlaylists, refreshing, fetching, error: playlistError}} = this.props;
    const shadowOpacity = interpolate(y, {
      inputRange: [0, 20],
      outputRange: [0, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Playlists</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        {userPlaylists.length !== 0 &&
          <AnimatedVirtualizedList
            data={userPlaylists}
            extraData={this.props}
            style={styles.scrollContainer}
            renderItem={this.renderPlaylist}
            keyExtractor={item => item}
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
            removeClippedSubviews={false}
            onScroll={onScroll({y})}
            scrollEventThrottle={16}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={<Text>Nothing to show</Text>}
            refreshing={refreshing.includes('playlists')}
            onRefresh={this.handleRefresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
          />
        }
        {(userPlaylists.length === 0 || !userPlaylists.length) &&
          <View style={styles.playlistsWrap}>
            {(!fetching.includes('playlists') && playlistError) && <Text>There was an error.</Text>}
            {fetching.includes('playlists' || (!fetching.includes('playlists') && !playlistError))  &&
              <View>
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