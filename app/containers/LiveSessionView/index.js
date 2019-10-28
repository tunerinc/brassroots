'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  VirtualizedList,
  TextInput,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import Modal from 'react-native-modal';
import Placeholder from 'rn-placeholder';

// Components
import TrackCard from '../../components/TrackCard';
import SessionTrackModal from '../../components/SessionTrackModal';
import DJModal from '../../components/DJModal';
import SessionActiveViewIcon from '../../components/SessionActiveViewIcon';
import DJCard from '../../components/DJCard';
import LoadingDJ from '../../components/LoadingDJ';
import SessionHeader from '../../components/SessionHeader';
import SessionFooter from '../../components/SessionFooter';
import ChatMessage from '../../components/ChatMessage';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Chat Action Creators
import {getChat} from '../../actions/chat/GetChat';
import {sendChatMessage} from '../../actions/chat/SendChatMessage';

// Player Action Creators
import {nextTrack} from '../../actions/player/NextTrack';
import {playTrack} from '../../actions/player/PlayTrack';
import {previousTrack} from '../../actions/player/PreviousTrack';
import {seekPosition} from '../../actions/player/SeekPosition';
import {togglePause} from '../../actions/player/TogglePause';
import {updatePlayer} from '../../actions/player/UpdatePlayer';

// Queue Action Creators
import {deleteQueueTrack} from '../../actions/queue/DeleteQueueTrack';
import {getUserQueue} from '../../actions/queue/GetUserQueue';
import {queueTrack} from '../../actions/queue/QueueTrack';
import {stopQueueListener} from '../../actions/queue/StopQueueListener';
import {toggleTrackLike} from '../../actions/queue/ToggleTrackLike';

// Sessions Action Creators
import {createSession} from '../../actions/sessions/CreateSession';
import {getSessionInfo} from '../../actions/sessions/GetSessionInfo';
import {leaveSession} from '../../actions/sessions/LeaveSession';
import {stopSessionInfoListener} from '../../actions/sessions/StopSessionInfoListener';

const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);

class LiveSessionView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewingPlayer: true,
      viewingChat: false,
      isMenuOpen: false,
      isSessionMenuOpen: false,
      inputHeight: 64,
      newTrackPosition: 0,
      seekTime: 0,
      editingQueue: false,
      message: '',
      shadowOpacity: new Animated.Value(0),
      playerOpacity: new Animated.Value(1),
      chatOpacity: new Animated.Value(0),
      animatedHeight: new Animated.Value(0),
      animatedOpacity: new Animated.Value(0),
      animatedIndex: new Animated.Value(-5),
      animatedDJOptionOpacity: new Animated.Value(0),

      // most likely will get removed
      fetchedChat: false,
      fetchedInfo: false,
      fetchedQueue: false,
    };

    this.progressInterval;
    this.updateSlider = this.updateSlider.bind(this);
    this.seekTrack = this.seekTrack.bind(this);
    this.changeActiveView = this.changeActiveView.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.navToSettings = this.navToSettings.bind(this);
    this.leave = this.leave.bind(this);
    this.skipNext = this.skipNext.bind(this);
    this.skipPrev = this.skipPrev.bind(this);
    this.delete = this.delete.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChangeInputHeight = this.handleChangeInputHeight.bind(this);
    this.handleSetChatMessage = this.handleSetChatMessage.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentDidMount() {
    const {fetchedChat, fetchedInfo, fetchedQueue} = this.state;
    const {
      getChat,
      getSessionInfo,
      getUserQueue,
      chat: {fetching: chatFetching, chatUnsubscribe},
      entities: {sessions},
      queue: {fetching: queueFetching, unsubscribe: queueUnsubscribe},
      sessions: {currentSessionID, fetching: sessionFetching, infoUnsubscribe},
      users: {currentUserID},
    } = this.props;
    
    if (currentSessionID) {
      const isOwner = sessions.byID[currentSessionID].ownerID === currentUserID;

      // if (!fetchedChat && !fetchingChat) {
      //   this.setState({fetchedChat: true});
      //   getChat(currentSessionID);
      // }

      if (!fetchedInfo && !sessionFetching.includes('info') && !infoUnsubscribe) {
        this.setState({fetchedInfo: true});
        getSessionInfo(currentSessionID);
      }

      if (!fetchedQueue && !queueFetching.includes('queue') && !queueUnsubscribe) {
        this.setState({fetchedQueue: true});
        getUserQueue(currentUserID, currentSessionID, isOwner);
      }
    }
  }

  componentDidUpdate(nextProps) {
    const {fetchedChat, fetchedInfo, fetchedQueue, editingQueue, seekTime} = this.state;
    const {
      getChat,
      getSessionInfo,
      getUserQueue,
      chat: {fetching: chatFetching, chatUnsubscribe},
      entities: {sessions},
      player: {progress},
      queue: {userQueue, fetching: queueFetching, unsubscribe: queueUnsubscribe},
      sessions: {currentSessionID, fetching: sessionFetching, infoUnsubscribe},
      users: {currentUserID},
    } = this.props;
    const {player: {progress: newProgress}} = nextProps;

    if (currentSessionID && sessions.allIDs.includes(currentSessionID)) {
      const isOwner = sessions.byID[currentSessionID].ownerID === currentUserID;

      // if (!fetchedChat && !fetchingChat) {
      //   this.setState({fetchedChat: true});
      //   getChat(currentSessionID);
      // }

      if (!fetchedInfo && !sessionFetching.includes('info') && !infoUnsubscribe) {
        this.setState({fetchedInfo: true});
        getSessionInfo(currentSessionID);
      }

      if (!fetchedQueue && !queueFetching.includes('queue') && !queueUnsubscribe) {
        this.setState({fetchedQueue: true});
        getUserQueue(currentUserID, currentSessionID, isOwner);
      }
    }

    if (editingQueue && userQueue.length === 0) this.toggleEdit();

    if (
      (progress === seekTime && newProgress !== seekTime)
      || (progress !== seekTime && newProgress === seekTime)
    ) {
      this.setState({seekTime: 0});
    }
  }

  updateSlider(pos) {
    const {seekTime} = this.state;
    const timeDiff = Math.abs(seekTime - pos);
    if (timeDiff >= 999) this.setState({seekTime: pos});
  }

  seekTrack() {
    const {seekTime} = this.state;
    const {
      seekPosition,
      sessions: {currentSessionID: session},
      users: {currentUserID: user},
    } = this.props;

    seekPosition(session, user, seekTime);
  }

  changeActiveView() {
    const {viewingChat, viewingPlayer} = this.state;
    this.setState({viewingChat: !viewingChat, viewingPlayer: !viewingPlayer});
  }

  onScroll({nativeEvent: {contentOffset, contentSize, layoutMeasurement: {height: layoutHeight}}}) {
    const {viewingChat, viewingPlayer, shadowOpacity} = this.state;
    const scrollingPlayer = viewingPlayer && contentOffset.y > 0;
    const scrollingChat = viewingChat && (contentSize.height - layoutHeight - 20) > contentOffset.y;

    if (scrollingPlayer || scrollingChat) {
      if (shadowOpacity !== 0.9) {
        Animated.timing(shadowOpacity, {
          toValue: 0.9,
          duration: 230,
          easing: Easing.linear
        }).start();
      }
    } else {
      Animated.timing(shadowOpacity, {
        toValue: 0,
        duration: 230,
        easing: Easing.linear
      }).start()
    }
  }

  navToSettings() {
    this.toggleMenu();
    Actions.liveSettings();
  }

  leave() {
    const {
      leaveSession,
      entities: {sessions, tracks, users},
      player: {currentTrackID},
      queue: {unsubscribe: queueUnsubscribe},
      sessions: {currentSessionID, infoUnsubscribe},
      users: {currentUserID},
    } = this.props;
    const track = tracks.byID[currentTrackID];
    const owner = users.byID[sessions.byID[currentSessionID].ownerID];

    this.setState({
      fetchedChat: false,
      fetchedInfo: false,
      fetchedQueue: false,
    });

    Actions.pop();

    leaveSession(
      currentUserID,
      {
        infoUnsubscribe,
        queueUnsubscribe,
        track,
        id: currentSessionID,
        total: sessions.byID[currentSessionID].totalListeners,
        chatUnsubscribe: () => console.log('chat'),
      },
      {
        id: owner.id,
        name: owner.displayName,
        image: owner.profileImage,
      },
    );
  }

  skipNext() {
    const {
      nextTrack,
      entities: {sessions, users},
      player: {nextQueueID, currentQueueID: current},
      queue: {totalUserQueue: totalQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const {displayName, profileImage} = users.byID[currentUserID];
    const {totalPlayed, totalListeners: totalUsers} = sessions.byID[currentSessionID];

    nextTrack(
      {displayName, profileImage, id: currentUserID},
      {totalQueue, totalPlayed, totalUsers, current, id: currentSessionID},
      nextQueueID,
    );
  }

  skipPrev() {
    const {
      previousTrack,
      entities: {queueTracks, sessions, tracks, users},
      player: {prevQueueID, prevTrackID, currentTrackID, currentQueueID, nextQueueID, nextTrackID},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const {displayName, profileImage} = users.byID[currentUserID];
    const {totalPlayed} = sessions.byID[currentSessionID];
    const {userID, totalLikes} = queueTracks.byID[currentQueueID];
    const track = tracks.byID[currentTrackID];
    const user = {displayName, profileImage, id: currentUserID};
    const session = {
      totalPlayed,
      id: currentSessionID,
      current: {
        userID,
        totalLikes,
        prevQueueID,
        prevTrackID,
        nextQueueID,
        nextTrackID,
        track,
        id: currentQueueID,
      },
    };

    previousTrack(user, session);
  }

  delete = queueID => () => {
    const {
      deleteQueueTrack,
      queue: {totalUserQueue: total},
      sessions: {currentSessionID: id},
    } = this.props;

    deleteQueueTrack({id, total}, queueID);
  }

  renderTrack({item, index}) {
    const {editingQueue} = this.state;
    const {
      entities: {queueTracks, sessions, tracks, users},
      queue: {deleting, liking, error: queueError},
      sessions: {currentSessionID},
    } = this.props;

    if (!currentSessionID || !tracks.allIDs.includes(item.trackID)) return <View></View>;

    const {ownerID} = sessions.byID[currentSessionID];
    const {liked, totalLikes, userID} = queueTracks.byID[item.id];
    const {name, artists} = tracks.byID[item.trackID];
    const {displayName} = users.byID[ownerID];
    const {profileImage, displayName: trackOwnerName} = users.byID[userID];

    return (
      <TrackCard
        key={item.id}
        artists={artists.map(a => a.name).join(', ')}
        context={{id: ownerID, type: 'userQueue', displayName, name: 'userQueue'}}
        deleting={deleting.includes(item.id)}
        deleteTrack={this.delete(item.id)}
        editing={editingQueue}
        image={profileImage}
        liking={liking.includes(item.id)}
        liked={liked}
        name={name}
        queueError={queueError}
        showRoundImage={true}
        toggleLike={this.toggleLike(item.id, liked)}
        totalLikes={totalLikes}
        trackID={item.trackID}
        type='userQueue'
        displayName={trackOwnerName}
      />
    );
  }

  renderMessage({item}) {
    const {
      entities: {messages, users},
      users: {currentUserID},
    } = this.props;
    const {text, timestamp, userID: chatOwner} = messages.byID[item];
    const {profileImage} = users.byID[chatOwner];

    return (
      <ChatMessage
        text={text}
        timestamp={timestamp}
        image={profileImage}
        isCurrentUser={chatOwner === currentUserID}
      />
    );
  }

  toggleMenu() {
    const {
      isMenuOpen,
      animatedDJOptionOpacity,
      animatedHeight,
      animatedOpacity,
      animatedIndex,
    } = this.state;
    const {
      entities: {sessions},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const session = sessions.byID[currentSessionID];
    const height = session && session.ownerID === currentUserID ? 352 : 306;

    if (session) {
      if (isMenuOpen) {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(
              animatedDJOptionOpacity,
              {toValue: 0, duration: 100, easing: Easing.linear}
            ),
            Animated.timing(
              animatedHeight,
              {toValue: 0, duration: 100, delay: 50, easing: Easing.linear}
            ),
            Animated.timing(
              animatedOpacity,
              {toValue: 0, duration: 200, delay: 50, easing: Easing.linear}
            )
          ]),
          Animated.timing(animatedIndex, {toValue: -5, duration: 1, easing: Easing.linear})
        ]).start();
      } else {
        Animated.sequence([
          Animated.timing(animatedIndex, {toValue: 5, duration: 1, easing: Easing.linear}),
          Animated.parallel([
            Animated.timing(animatedHeight, {toValue: height, duration: 100, easing: Easing.linear}),
            Animated.timing(
              animatedDJOptionOpacity,
              {toValue: 1, duration: 100, delay: 50, easing: Easing.linear}
            ),
            Animated.timing(animatedOpacity, {toValue: 0.7, duration: 50, easing: Easing.linear})
          ])
        ]).start();
      }
  
      this.setState({isMenuOpen: !isMenuOpen});
    }
  }

  openModal = () => this.setState({isSessionMenuOpen: true});

  closeModal = () => this.setState({isSessionMenuOpen: false});

  toggleEdit = () => this.setState({editingQueue: !this.state.editingQueue});

  handleChangeInputHeight({nativeEvent: {contentSize: {height: inputHeight}}}) {
    this.setState({inputHeight});
  }

  handleSetChatMessage({nativeEvent: {text: message}}) {
    this.setState({message});
  }

  sendChatMessage() {
    const {message} = this.state;
    const {
      sendChatMessage,
      chat: {totalCurrentChat},
      entities: {users},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const {displayName, profileImage} = users.byID[currentUserID];
    const user = {displayName, profileImage, id: currentUserID};

    sendChatMessage(currentSessionID, message, user, totalCurrentChat + 1);
  }

  togglePause() {
    const {
      togglePause,
      entities: {sessions},
      player: {paused, currentTrackID, progress},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const session = sessions.byID[currentSessionID];
    const currentSession = {progress, id: currentSessionID, current: currentTrackID};

    if (session) togglePause(currentUserID, session.ownerID, currentSession, !paused);
  }

  renderModalContent() {
    return <SessionTrackModal closeModal={this.closeModal} />;
  }

  renderHeader() {
    const {seekTime, editingQueue} = this.state;
    const {
      entities: {queueTracks, sessions, tracks, users},
      player: {currentTrackID, currentQueueID, paused, prevTrackID, nextTrackID, progress},
      queue: {userQueue},
      sessions: {currentSessionID},
      tracks: {userTracks},
      users: {currentUserID},
    } = this.props;

    if (
      !currentSessionID
      || !currentTrackID
      || !sessions.allIDs.includes(currentSessionID)
      || !queueTracks.allIDs.includes(currentQueueID)
    ) return <View></View>;

    const {totalListeners, distance, mode, ownerID} = sessions.byID[currentSessionID];
    const {album, durationMS, name, artists} = tracks.byID[currentTrackID];
    const {userID} = queueTracks.byID[currentQueueID];
    const {displayName} = users.byID[userID];

    let listenerTotal = 0;
    let formattedDistance = '';

    if (totalListeners < 1000) {
      listenerTotal = `${totalListeners}`;
    } else if (totalListeners < 1000000) {
      let modifiedCount = totalListeners / 1000;
      listenerTotal = `${modifiedCount.toFixed(0)}K`;
    } else if (totalListeners < 1000000000) {
      let modifiedCount = totalListeners / 1000000;
      listenerTotal = `${modifiedCount.toFixed(0)}M`;
    } else if (totalListeners < 1000000000000) {
      let modifiedCount = totalListeners / 1000000000;
      listenerTotal = `${modifiedCount.toFixed(0)}B`;
    }

    if (distance === -1) {
      formattedDistance = '--';
    } else if (distance < 1000) {
      formattedDistance = `${distance}`;
    } else if (distance < 1000000) {
      let modifiedCount = distance / 1000;
      formattedDistance = `${modifiedCount.toFixed(0)}K`;
    } else if (distance < 1000000000) {
      let modifiedCount = distance / 1000000;
      formattedDistance = `${modifiedCount.toFixed(0)}M`;
    } else if (distance < 1000000000000) {
      let modifiedCount = distance / 1000000000;
      formattedDistance = `${modifiedCount.toFixed(0)}B`;
    }

    return (
      <SessionHeader
        toggleEdit={this.toggleEdit}
        togglePause={this.togglePause}
        openModal={this.openModal}
        seekTrack={this.seekTrack}
        skipNext={this.skipNext}
        skipPrev={this.skipPrev}
        updateSlider={this.updateSlider}
        distance={formattedDistance}
        listeners={listenerTotal}
        seekTime={seekTime}
        seeking={seekTime !== 0}
        editingQueue={editingQueue}
        image={album.large}
        mode={mode}
        prevTrackID={prevTrackID}
        nextTrackID={nextTrackID}
        currentQueueID={currentQueueID}
        currentUserID={currentUserID}
        ownerID={ownerID}
        paused={paused}
        queueLength={userQueue.length}
        sessionID={currentSessionID}
        durationMS={durationMS}
        progress={progress}
        trackID={currentTrackID}
        name={name}
        saved={userTracks.includes(currentTrackID)}
        artists={artists.map(a => a.name).join(', ')}
        displayName={displayName}
      />
    );
  };

  toggleLike = (queueID, liked) => () => {
    const {
      toggleTrackLike,
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    toggleTrackLike(currentSessionID, queueID, currentUserID, liked);
  }

  renderFooter() {
    const {
      entities: {sessions, tracks, users},
      player: {currentTrackID},
      queue: {contextQueue, context},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const {profileImage, displayName} = users.byID[currentUserID];

    if (
      !currentSessionID
      || !currentTrackID
      || !sessions.allIDs.includes(currentSessionID)
    ) return <View></View>;

    const contextTracks = contextQueue.map(id => {
      return {
        id,
        name: tracks.byID[id].name,
        artists: tracks.byID[id].artists.map(a => a.name).join(', '),
      };
    });

    return (
      <SessionFooter
        toggleLike={() => console.log('like pressed')}
        currentUserID={currentUserID}
        displayName={displayName}
        image={profileImage}
        contextQueue={contextTracks}
        context={context}
      />
    );
  }

  render() {
    const {
      inputHeight,
      viewingPlayer,
      viewingChat,
      isSessionMenuOpen,
      isMenuOpen,
      message,
      shadowOpacity,
      animatedOpacity,
      animatedHeight,
      animatedDJOptionOpacity,
      animatedIndex,
    } = this.state;
    const animatedBottomMargin = {marginBottom: inputHeight > 24 ? inputHeight + 44 : 68};
    const {
      entities: {sessions, tracks, users},
      chat: {currentChat},
      player: {currentTrackID},
      queue: {userQueue},
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;
    const user = users.byID[currentUserID];
    const session = sessions.allIDs.includes(currentSessionID) ? sessions.byID[currentSessionID] : null;
    const track = tracks.allIDs.includes(currentTrackID) ? tracks.byID[currentTrackID] : null;
    const sessionOwner = session && users.allIDs.includes(session.ownerID)
      ? users.byID[session.ownerID]
      : user;

    return (
      <View style={styles.container}>
        <View style={styles.headerBackground}>
          {(session && track) &&
            <Image
              style={styles.headerBackgroundImage}
              source={{uri: track.album.large}}
              blurRadius={90}
            />
          }
          <View style={styles.backgroundFilter}></View>
        </View>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.shadowBackground}>
            <View style={styles.shadowBackgroundWrap}>
              {(session && track) &&
                <Image
                  style={styles.shadowBackgroundImage}
                  blurRadius={90}
                  source={{uri: track.album.large}}
                />
              }
              <View style={styles.backgroundFilter}></View>
            </View>
          </View>
          <View style={styles.nav}>
            <TouchableOpacity
              style={styles.leftIconButton}
              onPress={Actions.pop}
              activeOpacity={0.5}
            >
              <Ionicons name="ios-arrow-down" style={styles.leftIcon} />
            </TouchableOpacity>
            {(currentSessionID === '' || !session || !sessionOwner) && <LoadingDJ />}
            {(session && sessionOwner) &&
              <DJCard
                isMenuOpen={isMenuOpen}
                ownerID={session.ownerID}
                profileImage={sessionOwner.profileImage}
                toggleMenu={this.toggleMenu}
                displayName={sessionOwner.displayName}
              />
            }
            <SessionActiveViewIcon
              changeActiveView={this.changeActiveView}
              viewingChat={viewingChat}
              viewingPlayer={viewingPlayer}
            />
          </View>
        </Animated.View>
        {(session && track && viewingPlayer) &&
          <VirtualizedList
            data={userQueue}
            renderItem={this.renderTrack}
            keyExtractor={item => item.id}
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onEndReachedThreshold={0.7}
            removeClippedSubviews={false}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            style={styles.playerWrap}
          />
        }
        {(session && track && viewingChat) &&
          <View style={styles.chatWrap}>
            <AnimatedVirtualizedList
              data={currentChat}
              renderItem={this.renderMessage}
              keyExtractor={item => item}
              getItem={(data, index) => data[index]}
              getItemCount={data => data.length}
              onEndReachedThreshold={0.7}
              removeClippedSubviews={false}
              onScroll={this.onScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              inverted
              contentContainerStyle={{paddingTop: 20}}
              style={[styles.chatList, animatedBottomMargin]}
            />
            <View style={styles.chatMessageBar}>
              {track &&
                <TouchableOpacity
                  style={styles.chatMessageArtButton}
                  onPress={this.changeActiveView}
                >
                  <FastImage style={styles.chatMessageArt} source={{uri: track.album.small}} />
                </TouchableOpacity>
              }
              <Animated.View style={styles.messageBarWrap}>
                <TextInput
                  multiline={true}
                  onChange={this.handleSetChatMessage}
                  value={message}
                  onContentSizeChange={this.handleChangeInputHeight}
                  placeholder=''
                  autoCapitalize='none'
                  placeholderTextColor='#888'
                  placeholderStyle={{fontWeight: '600'}}
                  maxLength={100}
                  style={[
                    styles.input,
                    {
                      height: inputHeight > 24 ? inputHeight + 24 : 48,
                      paddingTop: 12,
                    },
                  ]}
                />
              </Animated.View>
              {message !== '' &&
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={this.sendChatMessage}
                >
                  <Text style={styles.sendText}>send</Text>
                </TouchableOpacity>
              }
              {message === '' &&
                <TouchableOpacity style={styles.sendButton} disabled>
                  <Text style={[styles.sendText, {color: '#888'}]}>send</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
        }
        <Modal
          isVisible={isSessionMenuOpen}
          backdropColor={'#1b1b1e'}
          backdropOpacity={0.7}
          animationIn='slideInUp'
          animationInTiming={200}
          backdropTransitionInTiming={200}
          animationOut='slideOutDown'
          animationOutTiming={200}
          backdropTransitionOutTiming={200}
          hideModalContentWhileAnimating
          useNativeDriver={true}
          style={styles.modal}
          onBackdropPress={this.closeModal}
        >
          <SessionTrackModal closeModal={this.closeModal} />
        </Modal>
        <DJModal
          backdropOpacity={animatedOpacity}
          height={animatedHeight}
          isCurrentUser={sessionOwner.id === currentUserID}
          optionsOpacity={animatedDJOptionOpacity}
          zIndex={animatedIndex}
          leave={this.leave}
          navToSettings={this.navToSettings}
          toggleMenu={this.toggleMenu}
        />
      </View>
    );
  }
}

LiveSessionView.propTypes = {
  chat: PropTypes.object.isRequired,
  deleteQueueTrack: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  getChat: PropTypes.func.isRequired,
  getSessionInfo: PropTypes.func.isRequired,
  getUserQueue: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  nextTrack: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  previousTrack: PropTypes.func.isRequired,
  queue: PropTypes.object.isRequired,
  seekPosition: PropTypes.func.isRequired,
  sendChatMessage: PropTypes.func.isRequired,
  sessions: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  stopSessionInfoListener: PropTypes.func.isRequired,
  stopQueueListener: PropTypes.func.isRequired,
  togglePause: PropTypes.func.isRequired,
  toggleTrackLike: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps(
  {artists, chat, entities, player, queue, sessions, settings, tracks, users},
) {
  return {
    artists,
    chat,
    entities,
    player,
    queue,
    sessions,
    settings,
    tracks,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createSession,
    deleteQueueTrack,
    getChat,
    getSessionInfo,
    getUserQueue,
    leaveSession,
    nextTrack,
    playTrack,
    previousTrack,
    queueTrack,
    seekPosition,
    sendChatMessage,
    stopSessionInfoListener,
    stopQueueListener,
    togglePause,
    toggleTrackLike,
    updatePlayer,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSessionView);