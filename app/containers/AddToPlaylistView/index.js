'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import LoadingPlaylist from '../../components/LoadingPlaylist';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

class AddToPlaylistView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shadowOpacity: new Animated.Value(0),
    };

    this.onScroll = this.onScroll.bind(this);
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

  render() {
    const {shadowOpacity} = this.state;
    const {playlists: {userPlaylists, fetchingPlaylists}} = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <View style={styles.leftIcon}></View>
            <Text style={styles.title}>Add to Playlist</Text>
            <Ionicons name='md-close' style={styles.rightIcon} onPress={Actions.pop} />
          </View>
        </Animated.View>
        <ScrollView style={styles.playlistsWrap} onScroll={this.onScroll} scrollEventThrottle={16}>
          <TouchableOpacity style={styles.createButton} disabled={true}>
            <Text style={styles.createButtonText}>CREATE PLAYLIST</Text>
          </TouchableOpacity>
          {!fetchingPlaylists &&
            <View>
              {userPlaylists.length !== 0 && <Text>We have stuff</Text>}
              {(userPlaylists.length === 0 || !userPlaylists.length) && <Text>Nothing to show</Text>}
            </View>
          }
          {fetchingPlaylists &&
            <View>
              <LoadingPlaylist />
              <LoadingPlaylist />
              <LoadingPlaylist />
              <LoadingPlaylist />
              <LoadingPlaylist />
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

AddToPlaylistView.propTypes = {
  playlists: PropTypes.object.isRequired,
};

function mapStateToProps({playlists}) {
  return {
    playlists,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylistView);