'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import FastImage from 'react-native-fast-image';
import {Text, View, Image, TouchableOpacity, Animated, Easing, Dimensions} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {|
  openPlayer: () => void,
  navToProfile: () => void,
  togglePause: () => void,
  progress: number,
  durationMS: number,
  profileImage: string,
  name: string,
  artists: string,
  displayName: string,
  paused: boolean,
  isOwner: boolean,
|};

type State = {||};

export const screenWidth: number = Dimensions.get('window').width;

export default class MiniPlayer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.refs['ticker'].startAnimation(3000);
  }
  
  render() {
    const {
      openPlayer,
      navToProfile,
      togglePause,
      progress,
      durationMS,
      profileImage,
      name,
      artists,
      displayName,
      paused,
      isOwner,
    } = this.props;
    const width: number = screenWidth * (progress / durationMS);
    const color: string = isOwner ? '#fefefe' : '#888';

    return (
      <Animated.View style={styles.player}>
        {(typeof progress === 'number' && typeof durationMS === 'number' && durationMS !== 0) &&
          <Animated.View style={[styles.playerProgress, {width}]}></Animated.View>
        }
        <TouchableOpacity style={styles.playerButton} onPress={openPlayer}>
          <TouchableOpacity style={styles.playerImageButton} onPress={navToProfile}>
            <FastImage style={styles.playerImage} source={{uri: profileImage}} />
          </TouchableOpacity>
          <View style={styles.playerInfo}>
            <TextTicker
              ref='ticker'
              numberOfLines={1}
              style={styles.playerTrack}
              scroll={false}
              bounce={false}
              animationType='bounce'
              marqueeOnMount={false}
              duration={200 * [...name, '•', ...artists].length}
              easing={Easing.linear}
            >
              <Text style={styles.playerTrackName}>
                {name}
              </Text>
              <Text style={styles.playerTrackSeparator}> • </Text>
              <Text>
                {artists}
              </Text>
            </TextTicker>
            <Text numberOfLines={1} style={styles.playerSessionOwner}>
              {displayName}
            </Text>
          </View>
          <TouchableOpacity style={styles.playerAction} onPress={togglePause} disabled={!isOwner}>
            {paused && <Entypo name='controller-play' color={color} style={styles.playIcon} />}
            {!paused && <Ionicons name='md-pause' color={color} style={styles.pauseIcon} />}
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}