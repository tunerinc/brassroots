'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, VirtualizedList, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modal';
import styles from './styles';

// Components
import LoadingTrack from '../../components/LoadingTrack';
import TrackCard from '../../components/TrackCard';
import TrackModal from '../../components/TrackModal';
import AddToQueueDialog from '../../components/AddToQueueDialog';
import ShuffleButton from '../../components/ShuffleButton';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Player Action Creators
import {playTrack} from '../../actions/player/PlayTrack';

// Queue Action Creators
import {queueTrack} from '../../actions/queue/QueueTrack';

// Sessions Action Creators
import {createSession} from '../../actions/sessions/CreateSession';
import {leaveSession} from '../../actions/sessions/LeaveSession';

// Tracks Action Creators
import {getRecentTracks} from '../../actions/tracks/GetRecentTracks';

class RecentlyPlayedView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTrackMenuOpen: false,
      selectedTrack: '',
    };

    this.refresh = this.refresh.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.shadowOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    const {
      getRecentTracks,
      selectedUser,
      users: {currentUserID, usersByID},
    } = this.props;
    const userID = selectedUser || currentUserID;
    const {recentlyPlayed} = usersByID[userID];

    this.closeModal();

    if (!recentlyPlayed.length) {
      getRecentTracks(userID);
    }
  }

  refresh() {
    const {
      getRecentTracks,
      selectedUser,
      tracks: {refreshingTracks},
      users: {currentUserID},
    } = this.props;
    const userID = selectedUser || currentUserID;

    if (refreshingTracks) return;

    getRecentTracks(userID);
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

  renderTrack({item, index}) {
    const {selectedUser, users: {currentUserID, usersByID}} = this.props;
    const {username} = usersByID[selectedUser] || usersByID[currentUserID];

    return (
      <TrackCard
        key={item}
        albumName={albumName}
        artists={artists.map(a => a.name).join(', ')}
        context={{
          displayName,
          id: userID,
          type: 'user-recently',
          name: displayName,
        }}
        image={small}
        name={name}
        openModal={this.openModal}
        showOptions={true}
        showSquareImage={true}
        type='cover'
      />
    );
  }

  handleAddTrack() {
    const {selectedTrack} = this.state;
    const {
      queueTrack,
      albums: {albumsByID},
      artists: {artistsByID},
      player: {prevQueueID},
      queue: {userQueue, queueByID, contextQueue, totalQueue},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;

    if (currentSessionID && Object.keys(sessionsByID).indexOf(currentSessionID)) {
      const {listeners, ownerID} = sessionsByID[currentSessionID];
      const isListenerOwner = listeners.indexOf(currentUserID) !== -1 || ownerID === currentUserID;
      const songQueued = userQueue.map(id => queueByID[id].trackID).indexOf(selectedTrack) !== -1;
      const {displayName, profileImage} = usersByID[currentUserID];

      if (isListenerOwner && !songQueued) {
        const {name, durationMS, albumID, artists} = tracksByID[selectedTrack];
        const {name: albumName, small, medium, large, artists: albumArtists} = albumsByID[albumID];
        const trackToQueue = {
          name,
          durationMS,
          id: selectedTrack,
          artists: artists.map(a => a.name).join(', '),
          album: {
            small,
            medium,
            large,
            id: albumID,
            name: albumName,
            artists: albumArtists.map(a => a.name).join(', '),
          },
        };

        this.closeModal();
        queueTrack(
          {
            prevQueueID,
            totalQueue,
            id: currentSessionID,
          },
          trackToQueue,
          {
            displayName,
            profileImage,
            id: currentUserID,
          },
        );
      }
    }
  }

  renderModalContent() {
    const {selectedTrack} = this.state;
    const {
      albums: {albumsByID},
      queue: {userQueue},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID},
    } = this.props;
    const isListenerOwner = sessionsByID[currentSessionID].listeners.includes(currentUserID)
      || sessionsByID[currentSessionID].ownerID === currentUserID;

    return (
      <TrackModal
        closeModal={this.closeModal}
        queueTrack={this.handleAddTrack}
        name={tracksByID[selectedTrack].name}
        artists={tracksByID[selectedTrack].artists.map(a => a.name).join(', ')}
        albumName={albumsByID[tracksByID[selectedTrack].albumID].name}
        albumImage={albumsByID[tracksByID[selectedTrack].albumID].small}
        trackID={selectedTrack}
        trackInQueue={userQueue.includes(selectedTrack)}
        isListenerOwner={isListenerOwner}
      />
    );
  }

  openModal = selectedTrack => () => {
    this.setState({selectedTrack, isTrackMenuOpen: true});
  }

  closeModal() {
    this.setState({isTrackMenuOpen: false});
  }

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.shadowOpacity};
    const {isTrackMenuOpen} = this.state;
    const {
      selectedUser,
      albums: {albumsByID},
      queue: {userQueue, queueing, error: queueError},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID, fetchingRecent, refreshingTracks, error: trackError},
      users: {currentUserID, usersByID},
    } = this.props;
    const {recentlyPlayed} = usersByID[selectedUser] || usersByID[currentUserID];
    const session = sessionsByID[currentSessionID];
    const inSession = session
      && session.listeners.indexOf(currentUserID) !== -1
      || session.ownerID === currentUserID;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <Ionicons
              name='ios-arrow-back'
              size={45}
              color='#fefefe'
              style={styles.leftIcon}
              onPress={this.navBack}
            />
            <Text style={styles.title}>Recently Played</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        {recentlyPlayed.length !== 0 &&
          <VirtualizedList
            data={recentlyPlayed}
            extraData={this.props}
            renderItem={this.renderTrack}
            keyExtractor={item => item}
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
            ListHeaderComponent={<ShuffleButton />}
            ListFooterComponent={<View style={{height: 20}}></View>}
            removeClippedSubviews={false}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>Nothing to show</Text>}
            refreshing={refreshingTracks}
            onRefresh={this.refresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.7}
          />
        }
        {(!recentlyPlayed || !recentlyPlayed.length || recentlyPlayed.length === 0) &&
          <View style={styles.recentlyPlayedWrap}>
            <ShuffleButton disabled={true} />
            {(fetchingRecent && !trackError) &&
              <View>
                <LoadingTrack type='cover' />
                <LoadingTrack type='cover' />
                <LoadingTrack type='cover' />
                <LoadingTrack type='cover' />
                <LoadingTrack type='cover' />
              </View>
            }
            {(!fetchingRecent && trackError) && <Text>Something went wrong</Text>}
            {(!fetchingRecent && !trackError) && <Text>Nothing to show</Text>}
          </View>
        }
        <Modal
          isVisible={isTrackMenuOpen}
          backdropColor={'#1b1b1e'}
          backdropOpacity={0.7}
          animationIn='slideInUp'
          animationInTiming={230}
          backdropTransitionInTiming={230}
          animationOut='slideOutDown'
          animationOutTiming={230}
          backdropTransitionOutTiming={230}
          hideModalContentWhileAnimating
          useNativeDriver={true}
          style={styles.modal}
          onBackdropPress={this.closeModal}
        >
          {this.renderModalContent()}
        </Modal>
        <AddToQueueDialog
          queueing={queueing}
          error={queueError}
          inSession={inSession}
          queueHasTracks={userQueue.length > 0}
          image={albumsByID[tracksByID[selectedTrack].albumID].medium}
        />
      </View>
    );
  }
}

RecentlyPlayedView.propTypes = {
  albums: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  createSession: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  player: PropTypes.func.isRequired,
  playTrack: PropTypes.func.isRequired,
  queue: PropTypes.object.isRequired,
  queueTrack: PropTypes.func.isRequired,
  selectedUser: PropTypes.string,
  sessions: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  tracks: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({albums, artists, player, queue, sessions, tracks, users}) {
  return {
    albums,
    artists,
    player,
    queue,
    sessions,
    tracks,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createSession,
    leaveSession,
    playTrack,
    queueTrack,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyPlayedView);