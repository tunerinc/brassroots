'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {HEADER_MAX_HEIGHT, HEADER_DELTA} from '../../containers/UserProfileView';

type Props = {|
  image: ?string,
  y: Animated.Value<number>,
  height: number,
|};

type State = {||};

const {interpolate, Extrapolate} = Animated;

export default class ImageCover extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {image, y, height} = this.props;
    const opacity = interpolate(y, {
      inputRange: [0, HEADER_DELTA * 0.9],
      outputRange: [0.4, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <Animated.View style={[styles.container, {height}]}>
        {typeof image === 'string' && <FastImage style={styles.image} source={{uri: image}} />}
        {typeof image === 'string' &&
          <Animated.Image style={[styles.image, {opacity}]} source={{uri: image}} blurRadius={60} />
        }
        <LinearGradient
          style={StyleSheet.absoluteFill}
          locations={[0.8, 1.0]}
          colors={[
            'rgba(27,27,30,0)',
            'rgba(27,27,30,1)',
          ]}
        />
      </Animated.View>
    );
  }
}