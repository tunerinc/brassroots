'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, Animated, Easing, VirtualizedList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modal';
import styles from './styles';

// Components
import TrackCard from '../../components/TrackCard';
import TrackModal from '../../components/TrackModal';
import LoadingTrack from '../../components/LoadingTrack';
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
import {getMostPlayedTracks} from '../../actions/tracks/GetMostPlayedTracks';

class MostPlayedView extends React.Component {
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
      getMostPlayedTracks,
      selectedUser,
      users: {currentUserID, usersByID},
    } = this.props;
    const userID = selectedUser || currentUserID;
    const {mostPlayed} = usersByID[userID];

    this.closeModal();

    if (!mostPlayed.length) {
      getMostPlayedTracks(userID);
    }
  }

  refresh() {
    const {
      getMostPlayedTracks,
      selectedUser,
      tracks: {refreshingTracks},
      users: {currentUserID},
    } = this.props;
    const userID = selectedUser || currentUserID;

    if (refreshingTracks) return;

    getMostPlayedTracks(userID);
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
    const {
      selectedUser,
      albums: {albumsByID},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {displayName} = usersByID[selectedUser] || usersByID[currentUserID];
    const {name, artists, albumID, userPlays} = tracksByID[item];
    const {name: albumName} = albumsByID[albumID];

    return (
      <TrackCard
        key={item}
        albumName={albumName}
        artists={artists.map(a => a.name).join(', ')}
        context={{
          displayName,
          id: currentUserID,
          name: displayName,
          type: 'user-most',
        }}
        name={name}
        trackCount={userPlays}
        trackIndex={index}
        type='most'
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
    const isListenerOwner = sessionsByID[currentSessionID].listeners.indexOf(currentUserID) !== -1
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
    const {isTrackMenuOpen, selectedTrack} = this.state;
    const {
      selectedUser,
      albums: {albumsByID},
      queue: {userQueue, queueing, error: queueError},
      sessions: {sessionsByID},
      tracks: {tracksByID, fetchingMostPlayed, refreshingTracks, error: trackError},
      users: {currentUserID, usersByID},
    } = this.props;
    const {mostPlayed} = selectedUser ? usersByID[selectedUser] : usersByID[currentUserID];
    const session = sessionsByID[currentSessionID];
    const inSession = session
      && session.listeners.indexOf(currentUserID) !== -1
      || session.ownerID === currentUserID;

    return (
      <View style={styles.container}>
        <Animated.View style={[ styles.shadow, animatedHeaderStyle ]}>
          <View style={styles.nav}>
            <Ionicons
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={Actions.pop}
            />
            <Text style={styles.title}>Most Played</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        {mostPlayed.length !== 0 &&
          <VirtualizedList
            data={mostPlayed}
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
        {(!mostPlayed || !mostPlayed.length || mostPlayed.length === 0) &&
          <View style={styles.mostPlayedWrap}>
            <ShuffleButton disabled={true} />
            {(!fetchingMostPlayed && trackError) && <Text>Something went wrong</Text>}
            {(!fetchingMostPlayed && !trackError) && <Text>Nothing to show</Text>}
            {fetchingMostPlayed &&
              <View>
                <LoadingTrack type='most' />
                <LoadingTrack type='most' />
                <LoadingTrack type='most' />
                <LoadingTrack type='most' />
                <LoadingTrack type='most' />
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
          image={albumsByID[tracksByID[selectedTrack].albumID].medium}
        />
      </View>
    );
  }
}

MostPlayedView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MostPlayedView);