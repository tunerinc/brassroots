'use strict';

import React from 'react';
import PropTypes from 'prop-types';
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
import {setProgress} from '../../actions/player/SetProgress';
import {toggleMute} from '../../actions/player/ToggleMute';
import {togglePause} from '../../actions/player/TogglePause';
import {toggleRepeat} from '../../actions/player/ToggleRepeat';
import {toggleShuffle} from '../../actions/player/ToggleShuffle';

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

      // most likely will get removed
      fetchedChat: false,
      fetchedInfo: false,
      fetchedQueue: false,
    };

    this.updateSlider = this.updateSlider.bind(this);
    this.seekTrack = this.seekTrack.bind(this);
    this.changeActiveView = this.changeActiveView.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.navToSettings = this.navToSettings.bind(this);
    this.leave = this.leave.bind(this);
    this.handleRepeat = this.handleRepeat.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.skipNext = this.skipNext.bind(this);
    this.skipPrev = this.skipPrev.bind(this);
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

    this.progressInterval;
    this.shadowOpacity = new Animated.Value(0);
    this.playerOpacity = new Animated.Value(1);
    this.chatOpacity = new Animated.Value(0);
    this.animatedHeight = new Animated.Value(0);
    this.animatedOpacity = new Animated.Value(0);
    this.animatedIndex = new Animated.Value(-5);
    this.animatedDJOptionOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    const {fetchedChat, fetchedInfo, fetchedQueue} = this.state;
    const {
      getChat,
      getSessionInfo,
      getUserQueue,
      chat: {fetchingChat, chatUnsubscribe},
      player: {currentQueueID},
      queue: {fetchingQueue, unsubscribe: queueUnsubscribe},
      sessions: {currentSessionID, fetchingInfo, infoUnsubscribe},
      users: {currentUserID},
    } = this.props;
    
    if (currentSessionID) {
      // if (!fetchedChat && !fetchingChat) {
      //   this.setState({fetchedChat: true});
      //   getChat(currentSessionID);
      // }

      if (!fetchedInfo && !fetchingInfo && !infoUnsubscribe) {
        this.setState({fetchedInfo: true});
        getSessionInfo(currentSessionID);
      }

      if (!fetchedQueue && !fetchingQueue && !queueUnsubscribe) {
        this.setState({fetchedQueue: true});
        getUserQueue(currentUserID, currentSessionID, currentQueueID);
      }
    }
  }

  componentDidUpdate(nextProps) {
    const {fetchedChat, fetchedInfo, fetchedQueue, editingQueue, seekTime} = this.state;
    const {
      getChat,
      getSessionInfo,
      getUserQueue,
      chat: {fetchingChat, chatUnsubscribe},
      player: {progress, currentQueueID},
      queue: {userQueue, fetchingQueue, unsubscribe: queueUnsubscribe},
      sessions: {currentSessionID, fetchingInfo, infoUnsubscribe},
      users: {currentUserID},
    } = this.props;
    const {player: {progress: newProgress}} = nextProps;

    if (currentSessionID) {
      // if (!fetchedChat && !fetchingChat) {
      //   this.setState({fetchedChat: true});
      //   getChat(currentSessionID);
      // }

      if (!fetchedInfo && !fetchingInfo && !infoUnsubscribe) {
        this.setState({fetchedInfo: true});
        getSessionInfo(currentSessionID);
      }

      if (!fetchedQueue && !fetchingQueue && !queueUnsubscribe) {
        this.setState({fetchedQueue: true});
        getUserQueue(currentUserID, currentSessionID, currentQueueID);
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
    const {seekTime} = this.state;;
    const timeDiff = Math.abs(seekTime - pos);

    if (timeDiff >= 999) {
      this.setState({seekTime: pos});
    }
  }

  seekTrack() {
    const {seekTime} = this.state;
    const {
      seekPosition,
      sessions: {currentSessionID},
      users: {currentUserID},
    } = this.props;

    seekPosition(currentSessionID, currentUserID, seekTime);
  }

  changeActiveView() {
    const {viewingChat, viewingPlayer} = this.state;
    this.setState({viewingChat: !viewingChat, viewingPlayer: !viewingPlayer});
  }

  onScroll({nativeEvent: {contentOffset, contentSize, layoutMeasurement: {height: layoutHeight}}}) {
    const {viewingChat, viewingPlayer} = this.state;
    const scrollingPlayer = viewingPlayer && contentOffset.y > 0;
    const scrollingChat = viewingChat && (contentSize.height - layoutHeight - 20) > contentOffset.y;

    if (scrollingPlayer || scrollingChat) {
      if (this.shadowOpacity !== 0.9) {
        Animated.timing(this.shadowOpacity, {
          toValue: 0.9,
          duration: 230,
          easing: Easing.linear
        }).start();
      }
    } else {
      Animated.timing(this.shadowOpacity, {
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
      albums: {albumsByID},
      player: {currentTrackID},
      queue: {unsubscribe: queueUnsubscribe},
      sessions: {currentSessionID, sessionsByID, infoUnsubscribe},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const track = tracksByID[currentTrackID];
    const owner = usersByID[sessionsByID[currentSessionID].ownerID];

    setTimeout(Actions.pop, 200);

    leaveSession(
      currentUserID,
      {
        infoUnsubscribe,
        id: currentSessionID,
        total: sessionsByID[currentSessionID].totalListeners,
        chatUnsubscribe: () => console.log('chat'),
        queueUnsubscribe: () => console.log('queue'),
        track: {
          id: track.id,
          name: track.name,
          trackNumber: track.trackNumber,
          durationMS: track.durationMS,
          artists: track.artists,
          album: {
            id: track.albumID,
            name: albumsByID[track.albumID].name,
            small: albumsByID[track.albumID].small,
            medium: albumsByID[track.albumID].medium,
            large: albumsByID[track.albumID].large,
            artists: albumsByID[track.albumID].artists,
          },
        },
      },
      {
        id: owner.id,
        name: owner.displayName,
        image: owner.profileImage,
      },
    );
  }

  handleRepeat() {
    // const {toggleRepeat, player: {repeat}, sessions: {currentSessionID}} = this.props;
    // toggleRepeat(currentSessionID, repeat);
  }

  handleShuffle() {
    // const {toggleShuffle, player: {shuffle}, sessions: {currentSessionID}} = this.props;
    // toggleShuffle(currentSessionID, shuffle);
  }

  handleMute() {
    // const {toggleMute, sessions: {currentSessionID, muted}, users: {currentUserID}} = this.props;
    // toggleMute(currentSessionID, currentUserID, muted);
  }

  skipNext() {
    console.log('skip next pressed');
  }

  skipPrev() {
    const {
      previousTrack,
      albums: {albumsByID},
      player: {prevQueueID, prevTrackID, currentTrackID, currentQueueID, nextQueueID, nextTrackID},
      queue: {queueByID},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {displayName, profileImage} = usersByID[currentUserID];
    const {totalPlayed} = sessionsByID[currentSessionID];
    const {userID, totalLikes} = queueByID[currentQueueID];
    const {name, trackNumber, durationMS, albumID, artists} = tracksByID[currentTrackID];
    const {small, medium, large, name: albumName, artists: albumArtists} = albumsByID[albumID];
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
        id: currentQueueID,
        track: {
          name,
          trackNumber,
          durationMS,
          artists,
          id: currentTrackID,
          album: {
            small,
            medium,
            large,
            id: albumID,
            name: albumName,
            artists: albumArtists,
          },
        },
      },
    };

    previousTrack(user, session);
  }

  renderTrack({item, index}) {
    const {editingQueue} = this.state;
    const {
      queue: {queueByID, deleting, error: queueError},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {usersByID},
    } = this.props;
    const {ownerID} = sessionsByID[currentSessionID];
    const {trackID, liked, totalLikes, userID} = queueByID[item];
    const {name, artists} = tracksByID[trackID];
    const {displayName} = usersByID[ownerID];
    const {profileImage, displayName: trackOwnerName} = usersByID[userID];

    return (
      <TrackCard
        key={item}
        artists={artists.map(a => a.name).join(', ')}
        context={{id: ownerID, type: 'userQueue', displayName, name: 'userQueue'}}
        deleting={deleting.includes(item)}
        editing={editingQueue}
        image={profileImage}
        liked={liked}
        name={name}
        queueError={queueError}
        showRoundImage={true}
        toggleLike={() => console.log('toggle like')}
        totalLikes={totalLikes}
        trackID={item}
        type='userQueue'
        displayName={trackOwnerName}
      />
    );
  }

  renderMessage({item}) {
    const {
      sessions: {chatByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {text, timestamp, userID: chatOwner} = chatByID[item];
    const {profileImage} = usersByID[chatOwner];

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
    const {isMenuOpen} = this.state;
    const {sessions: {currentSessionID, sessionsByID}, users: {currentUserID}} = this.props;
    const currentSession = sessionsByID[currentSessionID];
    const height = currentSession && currentSession.ownerID === currentUserID ? 352 : 306;

    if (currentSession) {
      if (isMenuOpen) {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(
              this.animatedDJOptionOpacity,
              {toValue: 0, duration: 115, easing: Easing.linear}
            ),
            Animated.timing(
              this.animatedHeight,
              {toValue: 0, duration: 115, delay: 58, easing: Easing.linear}
            ),
            Animated.timing(
              this.animatedOpacity,
              {toValue: 0, duration: 230, delay: 58, easing: Easing.linear}
            )
          ]),
          Animated.timing(
            this.animatedIndex,
            {toValue: -5, duration: 1, easing: Easing.linear}
          )
        ]).start();
      } else {
        Animated.sequence([
          Animated.timing(
            this.animatedIndex,
            {toValue: 5, duration: 1, easing: Easing.linear}
          ),
          Animated.parallel([
            Animated.timing(
              this.animatedHeight,
              {toValue: height, duration: 115, easing: Easing.linear}
            ),
            Animated.timing(
              this.animatedDJOptionOpacity,
              {toValue: 1, duration: 115, delay: 58, easing: Easing.linear}
            ),
            Animated.timing(
              this.animatedOpacity,
              {toValue: 0.7, duration: 58, easing: Easing.linear}
            )
          ])
        ]).start();
      }
  
      this.setState({isMenuOpen: !isMenuOpen});
    }
  }

  openModal() {
    this.setState({isSessionMenuOpen: true});
  }

  closeModal() {
    this.setState({isSessionMenuOpen: false});
  }

  toggleEdit() {
    const {editingQueue} = this.state;
    this.setState({editingQueue: !editingQueue});
  }

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
      chat: {totalChatMessages},
      sessions: {currentSessionID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {displayName, profileImage} = usersByID[currentUserID];
    const user = {displayName, profileImage, id: currentUserID};

    sendChatMessage(currentSessionID, message, user, totalChatMessages + 1);
  }

  togglePause() {
    const {
      togglePause,
      player: {paused, currentTrackID, progress},
      sessions: {currentSessionID, sessionsByID},
      users: {currentUserID},
    } = this.props;
    const currentSession = sessionsByID[currentSessionID];

    if (currentSession) {
      togglePause(
        currentUserID,
        currentSession.ownerID,
        {progress, id: currentSessionID, current: currentTrackID},
        !paused,
      );
    }
  }

  renderModalContent() {
    return <SessionTrackModal closeModal={this.closeModal} />;
  }

  renderHeader() {
    const {seekTime, editingQueue} = this.state;
    const {
      albums: {albumsByID},
      player: {currentTrackID, currentQueueID, paused, prevTrackID, nextTrackID, progress},
      queue: {userQueue, queueByID},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID, userTracks},
      users: {currentUserID, usersByID},
    } = this.props;

    if (!currentSessionID || !currentTrackID || !sessionsByID[currentSessionID]) return <View></View>;

    const {totalListeners, distance, mode, ownerID} = sessionsByID[currentSessionID];
    const {albumID, durationMS, name, artists} = tracksByID[currentTrackID];
    const {large} = albumsByID[albumID];

    // const {userID} = queueByID[currentQueueID];
    // const {displayName} = usersByID[userID];

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
        image={large}
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
        displayName={usersByID[currentUserID].displayName}
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
      player: {currentTrackID},
      queue: {contextQueue, context},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {profileImage} = usersByID[currentUserID];

    if (!currentSessionID || !sessionsByID[currentSessionID] || !currentTrackID) return <View></View>;

    const contextTracks = contextQueue.map(id => {
      return {
        id,
        name: tracksByID[id].name,
        artists: tracksByID[id].artists.map(a => a.name).join(', '),
      };
    });

    return (
      <SessionFooter
        toggleLike={() => console.log('like pressed')}
        currentUserID={currentUserID}
        displayName={usersByID[currentUserID].displayName}
        image={profileImage}
        contextQueue={contextTracks}
        context={context}
      />
    );
  }

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.shadowOpacity};
    const {
      inputHeight,
      viewingPlayer,
      viewingChat,
      isSessionMenuOpen,
      isMenuOpen,
      message,
    } = this.state;
    const animatedBottomMargin = {marginBottom: inputHeight > 24 ? inputHeight + 44 : 68};
    const {
      albums: {albumsByID},
      chat: {currentChat},
      player: {currentTrackID},
      queue: {userQueue},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {usersByID, currentUserID},
    } = this.props;
    const currentUser = usersByID[currentUserID];
    const currentSession = currentSessionID ? sessionsByID[currentSessionID] : null;
    const currentTrack = currentTrackID ? tracksByID[currentTrackID] : null;
    const currentAlbum = currentTrack ? albumsByID[currentTrack.albumID] : null;
    const sessionOwner = currentSession ? usersByID[currentSession.ownerID] : currentUser;

    return (
      <View style={styles.container}>
        <View style={styles.headerBackground}>
          {(currentSession && currentAlbum) &&
            <Image
              style={styles.headerBackgroundImage}
              source={{uri: currentAlbum.large}}
              blurRadius={90}
            />
          }
          <View style={styles.backgroundFilter}></View>
        </View>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.shadowBackground}>
            <View style={styles.shadowBackgroundWrap}>
              {(currentSession && currentAlbum) &&
                <Image
                  style={styles.shadowBackgroundImage}
                  blurRadius={90}
                  source={{uri: currentAlbum.large}}
                />
              }
              <View style={styles.backgroundFilter}></View>
            </View>
          </View>
          <View style={styles.nav}>
            <Ionicons
              name='ios-arrow-down'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={Actions.pop}
            />
            {(currentSessionID === '' || !currentSession || !sessionOwner) && <LoadingDJ />}
            {(currentSession && sessionOwner) &&
              <DJCard
                isMenuOpen={isMenuOpen}
                ownerID={currentSession.ownerID}
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
        {(currentSession && viewingPlayer) &&
          <VirtualizedList
            data={userQueue}
            renderItem={this.renderTrack}
            keyExtractor={item => item}
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
        {(currentSession && viewingChat) &&
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
              {currentAlbum &&
                <TouchableOpacity
                  style={styles.chatMessageArtButton}
                  onPress={this.changeActiveView}
                >
                  <Image style={styles.chatMessageArt} source={{uri: currentAlbum.small}} />
                </TouchableOpacity>
              }
              {!currentAlbum &&
                <View style={styles.chatMessageArt}>
                  <Placeholder.Media
                    animate='fade'
                    size={40}
                    hasRadius={false}
                    color='#888'
                  />
                </View>
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
          <SessionTrackModal closeModal={this.closeModal} />
        </Modal>
        <DJModal
          backdropOpacity={this.animatedOpacity}
          height={this.animatedHeight}
          isCurrentUser={sessionOwner.id === currentUserID}
          optionsOpacity={this.animatedDJOptionOpacity}
          zIndex={this.animatedIndex}
          leave={this.leave}
          navToSettings={this.navToSettings}
          toggleMenu={this.toggleMenu}
        />
      </View>
    );
  }
}

LiveSessionView.propTypes = {
  albums: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  deleteQueueTrack: PropTypes.func.isRequired,
  getChat: PropTypes.func.isRequired,
  getSessionInfo: PropTypes.func.isRequired,
  getUserQueue: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
  nextTrack: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
  previousTrack: PropTypes.func.isRequired,
  queue: PropTypes.object.isRequired,
  seekPosition: PropTypes.func.isRequired,
  sendChatMessage: PropTypes.func.isRequired,
  sessions: PropTypes.object.isRequired,
  setProgress: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  stopSessionInfoListener: PropTypes.func.isRequired,
  stopQueueListener: PropTypes.func.isRequired,
  togglePause: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  toggleMute: PropTypes.func.isRequired,
  toggleRepeat: PropTypes.func.isRequired,
  toggleShuffle: PropTypes.func.isRequired,
  toggleTrackLike: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps(
  {albums, artists, chat, player, playlists, queue, sessions, settings, tracks, users},
) {
  return {
    albums,
    artists,
    chat,
    player,
    playlists,
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
    setProgress,
    stopSessionInfoListener,
    stopQueueListener,
    toggleMute,
    togglePause,
    toggleRepeat,
    toggleShuffle,
    toggleTrackLike,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSessionView);