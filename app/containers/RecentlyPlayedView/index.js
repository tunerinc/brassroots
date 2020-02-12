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
      shadowOpacity: new Animated.Value(0),
    };

    this.refresh = this.refresh.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const {
      getRecentTracks,
      selectedUser,
      entities: {users},
      users: {currentUserID},
    } = this.props;
    const userID = selectedUser || currentUserID;
    const {recentlyPlayed} = users.byID[userID];

    this.closeModal();

    if (!recentlyPlayed.length) getRecentTracks(userID);
  }

  refresh() {
    const {
      getRecentTracks,
      selectedUser,
      tracks: {refreshing},
      users: {currentUserID},
    } = this.props;
    const userID = selectedUser || currentUserID;

    if (!refreshing) getRecentTracks(userID);
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

  renderTrack({item, index}) {
    const {
      selectedUser,
      entities: {tracks, users},
      users: {currentUserID},
    } = this.props;

    if (!tracks.allIDs.includes(item)) return <View></View>;

    const userID = selectedUser || currentUserID;
    const {album, artists, name} = tracks.byID[item];
    const {username} = users.byID[userID];

    return (
      <TrackCard
        key={item}
        albumName={album.name}
        artists={artists.map(a => a.name).join(', ')}
        context={{
          displayName,
          id: userID,
          type: 'user-recently',
          name: displayName,
        }}
        image={album.small}
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
      entities: {queueTracks, sessions, tracks, users},
      player: {currentQueueID},
      queue: {userQueue, totalUserQueue: totalQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    if (sessions.allIDs.includes(currentSessionID)) {
      const {listeners, ownerID} = sessions.byID[currentSessionID];
      const isListenerOwner = listeners.includes(currentUserID) || ownerID === currentUserID;
      const songInQueue = userQueue.map(t => t.trackID).includes(selectedTrack);
      const {displayName, profileImage} = users.byID[currentUserID];

      if (isListenerOwner && !songInQueue) {
        const track = tracks.byID[selectedTrack];
        const prevQueueID = userQueue.length ? userQueue[userQueue.length - 1].id : currentQueueID;
        const prevTrackID = queueTracks.byID[prevQueueID];
        const session = {prevQueueID, prevTrackID, totalQueue, id: currentSessionID};
        const user = {displayName, profileImage, id: currentUserID};

        this.closeModal();
        queueTrack(session, track, user);
      }
    }
  }

  renderModalContent() {
    const {selectedTrack} = this.state;
    const {
      entities: {queueTracks, sessions, tracks},
      queue: {userQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    if (!selectedTrack || !tracks.allIDs.includes(selectedTrack)) return <View></View>;

    const sessionExists = currentSessionID && sessions.allIDs.includes(currentSessionID);
    const songQueued = userQueue.map(o => o.trackID).includes(selectedTrack);
    const isListenerOwner = sessionExists
      && (
        sessions.byID[currentSessionID].listeners.includes(currentUserID)
        || sessions.byID[currentSessionID].ownerID === currentUserID
      );

    return (
      <TrackModal
        trackID={selectedTrack}
        closeModal={this.closeModal}
        queueTrack={this.handleAddTrack}
        name={tracks.byID[selectedTrack].name}
        artists={tracks.byID[selectedTrack].artists.map(a => a.name).join(', ')}
        albumName={tracks.byID[selectedTrack].album.name}
        albumImage={tracks.byID[selectedTrack].album.small}
        trackInQueue={songQueued}
        isListenerOwner={sessionExists ? isListenerOwner : null}
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
    const {isTrackMenuOpen, shadowOpacity} = this.state;
    const {
      selectedUser,
      entities: {albums, sessions, tracks, users},
      queue: {userQueue, queueing, error: queueError},
      sessions: {currentSessionID},
      tracks: {fetching, refreshing, error: trackError},
      users: {currentUserID},
    } = this.props;
    const userID = selectedUser || currentUserID;
    const {recentlyPlayed} = users.byID[userID];
    const session = sessions.byID[currentSessionID];
    const inSession = sessions.allIDs.includes(currentSessionID)
      && (
        session.listeners.includes(currentUserID)
        || session.ownerID === currentUserID
      );

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={this.navBack} />
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
            refreshing={refreshing}
            onRefresh={this.refresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.7}
          />
        }
        {(!recentlyPlayed || !recentlyPlayed.length || recentlyPlayed.length === 0) &&
          <View style={styles.recentlyPlayedWrap}>
            <ShuffleButton disabled={true} />
            {(!fetching.includes('recent') && trackError) && <Text>Something went wrong</Text>}
            {(!fetching.includes('recent') && !trackError) && <Text>Nothing to show</Text>}
            {(fetching.includes('recent') && !trackError) &&
              <View>
                <LoadingTrack type='cover' />
                <LoadingTrack type='cover' />
                <LoadingTrack type='cover' />
                <LoadingTrack type='cover' />
                <LoadingTrack type='cover' />
              </View>
            }
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
          image={tracks.byID[selectedTrack].album.medium}
        />
      </View>
    );
  }
}

RecentlyPlayedView.propTypes = {
  entities: PropTypes.object.isRequired,
  createSession: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  player: PropTypes.func.isRequired,
  playTrack: PropTypes.func.isRequired,
  queue: PropTypes.object.isRequired,
  queueTrack: PropTypes.func.isRequired,
  selectedUser: PropTypes.string,
  sessions: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({entities, player, queue, sessions, tracks, users}) {
  return {
    entities,
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