'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text} from 'react-native';
import Slider from 'react-native-slider';
import convertMillisTime from '../../utils/convertMillisTime';
import styles from './styles';

type Props = {|
  sessionID?: string,
  currentUserID: string,
  durationMS: number,
  ownerID: string,
  progress: number,
  seeking: boolean,
  seekTime: number,
  seekTrack: () => any,
  updateSlider: () => any,
|};

type State = {||};

export default class PlayerSlider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    const {progress, seekTime} = nextProps;
    const {progress: currentProgress, seekTime: newSeekTime} = this.props;
    return ((progress !== currentProgress) || (seekTime !== newSeekTime));
  }

  render() {
    const {
      sessionID,
      currentUserID,
      durationMS,
      ownerID,
      progress,
      seeking,
      seekTime,
      seekTrack,
      updateSlider,
    } = this.props;
    const currentTime: string = seeking ? convertMillisTime(seekTime) : convertMillisTime(progress);
    const isOwner = currentUserID === ownerID;
    const thumbColor: string = isOwner ? '#fefefe' : '#888';
    const remTime: string = seeking
      ? convertMillisTime(durationMS - seekTime)
      : convertMillisTime(durationMS - progress);

    return (
      <View style={styles.container}>
        <Slider
          ref='PlayerSlider'
          disabled={sessionID && ownerID !== currentUserID}
          minimumTrackTintColor='#fefefe'
          maximumTrackTintColor='#888'
          thumbTintColor={thumbColor}
          style={seeking ? styles.seekingSlider : styles.slider}
          thumbStyle={seeking ? styles.seekingThumb : styles.thumb}
          step={1000}
          onSlidingComplete={seekTrack}
          onValueChange={updateSlider}
          value={seeking && seekTime !== 0 ? seekTime : progress}
          maximumValue={durationMS}
        />
        <View style={styles.times}>
          <Text style={styles.current}>
            {currentTime}
          </Text>
          <Text style={styles.remaining}>
            -{remTime}
          </Text>
        </View>
      </View>
    );
  }
}