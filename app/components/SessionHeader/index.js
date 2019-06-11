'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SessionPlayer from '../SessionPlayer';
import SessionModeIcon from '../SessionModeIcon';
import PlayerSlider from '../PlayerSlider';
import SessionTrack from '../SessionTrack';
import styles from './styles';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {|
  toggleEdit: () => any,
  togglePause: () => any,
  openModal: () => any,
  seekTrack: () => any,
  skipNext: () => any,
  skipPrev: () => any,
  updateSlider: () => any,
  distance: string | number,
  listeners: string | number,
  seekTime: number,
  seeking: boolean,
  editingQueue: boolean,
  image: string,
  mode: string,
  live: boolean,
  prevTrackID: ?string,
  nextTrackID: ?string,
  currentQueueID: string,
  currentUserID: string,
  ownerID: string,
  paused: boolean,
  queueLength: number,
  sessionID: string,
  durationMS: number,
  progress: number,
  trackID?: string,
  name: string,
  saved: boolean,
  artists: string,
  displayName: string,
|};

type State = {||};

export default class SessionHeader extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      toggleEdit,
      togglePause,
      openModal,
      seekTrack,
      skipNext,
      skipPrev,
      updateSlider,
      distance,
      listeners,
      seekTime,
      seeking,
      editingQueue,
      image,
      mode,
      live,
      prevTrackID,
      nextTrackID,
      currentQueueID,
      currentUserID,
      ownerID,
      paused,
      queueLength,
      sessionID,
      durationMS,
      progress,
      trackID,
      name,
      saved,
      artists,
      displayName,
    } = this.props;

    return (
      <View>
        <SessionPlayer
          togglePause={togglePause}
          skipNext={skipNext}
          skipPrev={skipPrev}
          prevTrackID={prevTrackID}
          nextTrackID={nextTrackID}
          isOwner={ownerID === currentUserID}
          paused={paused}
          image={image}
        />
        <View style={styles.sessionLiveMode}>
          <SessionModeIcon mode={mode} />
          {live && <Text style={styles.sessionLiveText}>LIVE</Text>}
          {!live &&
            <Text
              style={[
                styles.sessionLiveText,
                {color: '#888'},
              ]}
            >LIVE</Text>
          }
        </View>
        <PlayerSlider
          sessionID={sessionID}
          currentUserID={currentUserID}
          durationMS={durationMS}
          ownerID={ownerID}
          progress={progress}
          seeking={seeking}
          seekTime={seekTime}
          seekTrack={seekTrack}
          updateSlider={updateSlider}
        />
        {trackID &&
          <SessionTrack
            trackID={trackID}
            queueID={currentQueueID}
            name={name}
            saved={saved}
            artists={artists}
            displayName={displayName}
            openModal={openModal}
          />
        }
        <View style={styles.sessionOptions}>
          <TouchableOpacity style={styles.listenersButton} disabled>
            <MaterialIcons name='group' color='#fefefe' style={styles.listenersIcon} />
            <Text style={styles.listenersTotal}>
              {listeners}
            </Text>
          </TouchableOpacity>
          <View style={styles.distance}>
            <Ionicons name='md-pin' color='#888' style={styles.distanceIcon} />
            <Text style={styles.distanceText}>
              {distance} mi
            </Text>
          </View>
          <TouchableOpacity style={styles.shareButton} disabled>
            <Ionicons name='md-share-alt' color='#fefefe' style={styles.shareIcon} />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.queue}>
          <Text style={styles.queueTitle}>Queue</Text>
          {ownerID === currentUserID && queueLength !== 0 &&
            <TouchableOpacity style={styles.queueOption} onPress={toggleEdit}>
              {editingQueue && <Text style={styles.queueOptionText}>done</Text>}
              {!editingQueue && <Text style={styles.queueOptionText}>edit</Text>}
            </TouchableOpacity>
          }
          {ownerID !== currentUserID || queueLength === 0 &&
            <TouchableOpacity style={styles.queueOption} disabled>
              <Text
                style={[
                  styles.queueOptionText,
                  {color: '#888'},
                ]}
              >edit</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}