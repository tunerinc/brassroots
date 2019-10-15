'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {HEADER_MAX_HEIGHT, HEADER_DELTA} from '../../containers/UserProfileView';

type Props = {|
  image: ?string,
  y: Animated.Value<number>,
|};

type State = {||};

const {interpolate, Extrapolate} = Animated;

export default class ImageCover extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {image, y} = this.props;
    const scale = interpolate(y, {
      inputRange: [-HEADER_MAX_HEIGHT, 0],
      outputRange: [4, 1],
      extrapolateRight: Extrapolate.CLAMP,
    });
    const opacity = interpolate(y, {
      inputRange: [0, HEADER_DELTA],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const coverOpacity = interpolate(y, {
      inputRange: [-65, 0, HEADER_DELTA],
      outputRange: [0, 0.2, 1],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <Animated.View style={[styles.container, {transform: [{scale}]}]}>
        {typeof image === 'string' && <FastImage style={styles.image} source={{uri: image}} />}
        {typeof image === 'string' &&
          <Animated.Image style={[styles.image, {opacity}]} source={{uri: image}} blurRadius={80} />
        }
        <Animated.View style={[styles.cover, {opacity: coverOpacity}]} />
      </Animated.View>
    );
  }
}