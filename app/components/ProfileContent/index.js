'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import {onScroll} from 'react-native-redash';
import {HEADER_MAX_HEIGHT} from '../../containers/UserProfileView';
import styles from './styles';

// Components
import MusicSection from '../MusicSection';

type Props = {|
  y: Animated.Value<number>,
  height: number,
|};

type State = {||};

const {interpolate, Extrapolate} = Animated;

export default class ProfileContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {y, height: coverHeight} = this.props;
    const height = interpolate(y, {
      inputRange: [-HEADER_MAX_HEIGHT, 0],
      outputRange: [0, HEADER_MAX_HEIGHT],
      extrapolate: Extrapolate.CLAMP,
    });
    const opacity = interpolate(y, {
      inputRange: [-HEADER_MAX_HEIGHT / 2, 0, HEADER_MAX_HEIGHT / 2],
      outputRange: [0, 1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <Animated.ScrollView
        onScroll={onScroll({y})}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
      >
        <View style={{height: coverHeight}}>
          <Animated.View style={[styles.gradient, {height}]}>
            <LinearGradient
              style={StyleSheet.absoluteFill}
              locations={[0, 0.4, 0.7, 0.90, 1]}
              colors={[
                'rgba(27,27,30,0)',
                'rgba(27,27,30,0.3)',
                'rgba(27,27,30,0.5)',
                'rgba(27,27,30,0.9)',
                'rgba(27,27,30,1.0)',
              ]}
            />
          </Animated.View>
        </View>
        <View style={{height: 1000, backgroundColor: '#1b1b1e'}}></View>
      </Animated.ScrollView>
    );
  }
}