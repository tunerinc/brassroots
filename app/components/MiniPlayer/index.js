'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import Dimensions from 'Dimensions';
import {Text, View, Image, TouchableOpacity, Animated, Easing} from 'react-native';
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
|};

type State = {||};

export const screenWidth: number = Dimensions.get('window').width;

export default class MiniPlayer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
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
    } = this.props;

    return (
      <Animated.View style={styles.player}>
        <Animated.View
          style={[
            styles.playerProgress,
            {width: screenWidth * (progress / durationMS)}
          ]}
        ></Animated.View>
        <TouchableOpacity style={styles.playerButton} onPress={openPlayer}>
          <TouchableOpacity style={styles.playerImageButton} onPress={navToProfile}>
            <Image style={styles.playerImage} source={{uri: profileImage}} />
          </TouchableOpacity>
          <View style={styles.playerInfo}>
            <TextTicker
              numberOfLines={1}
              style={styles.playerTrack}
              scroll={false}
              bounce={false}
              animationType='bounce'
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
          <TouchableOpacity style={styles.playerAction} onPress={togglePause}>
            {paused && <Entypo name='controller-play' color='#fefefe' style={styles.playIcon} />}
            {!paused && <Ionicons name='md-pause' color='#fefefe' style={styles.pauseIcon} />}
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}