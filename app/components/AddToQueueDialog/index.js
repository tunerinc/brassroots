'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, Image, Animated, Easing} from 'react-native';
import styles from './styles';
import type AnimatedValue from 'react-native/Libraries/Animated/src/nodes/AnimatedValue';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {|
  queueing: boolean,
  error: boolean,
  inSession: boolean,
  queueHasTracks: boolean,
  image: ?string,
|};

type State = {|showedDialog: boolean|};

export default class AddToQueueDialog extends React.Component<Props, State> {
  containerIndex: AnimatedValue
  containerOpacity: AnimatedValue
  contentOpacity: AnimatedValue

  constructor(props: Props) {
    super(props);

    this.state = {showedDialog: true};

    this.containerIndex = new Animated.Value(-10);
    this.containerOpacity = new Animated.Value(0);
    this.contentOpacity = new Animated.Value(0);
  }

  handleOpacityChange() {
    Animated.sequence([
      Animated.timing(this.containerIndex, {
        toValue: 10,
        duration: 1,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(this.containerOpacity, {
        toValue: 0.9,
        duration: 230,
        delay: 1,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(this.contentOpacity, {
        toValue: 1,
        duration: 230,
        delay: 1,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(this.contentOpacity, {
        toValue: 0,
        duration: 230,
        delay: 1001,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(this.containerOpacity, {
        toValue: 0,
        duration: 230,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(this.containerIndex, {
        toValue: -10,
        duration: 1,
        delay: 1,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ]).start();

    this.setState({showedDialog: true});
  }

  componentDidUpdate(prevProps: Props) {
    const {showedDialog} = this.state;
    const {queueing: oldQueueing} = prevProps;
    const {queueing, error, inSession, queueHasTracks} = this.props;
    const doneQueueing: boolean = !queueing && oldQueueing;

    if (doneQueueing && !error && !showedDialog && inSession && queueHasTracks) {
      this.handleOpacityChange();
    }

    if (queueing && !oldQueueing && showedDialog) {
      this.setState({showedDialog: false});
    }
  }

  render() {
    const {showedDialog} = this.state;
    const {inSession, image} = this.props;

    if (!inSession || (!image && showedDialog)) return null;

    return (
      <Animated.View
        style={[
          styles.container,
          {zIndex: this.containerIndex, opacity: this.containerOpacity}
        ]}
      >
        <View style={styles.playerBackgroundWrap}>
          <View style={styles.cover}></View>
          <Image
            style={styles.playerBackgroundImage}
            source={{uri: image}}
            resizeMode='cover'
            blurRadius={90}
          />
        </View>
        <Animated.View style={[styles.content, {opacity: this.contentOpacity}]}>
          <Ionicons
            name='md-checkmark'
            size={80}
            color='#fefefe'
            style={styles.checkmark}
          />
          <View style={styles.textWrap}>
            <Text style={styles.text}>Added to</Text>
            <Text style={styles.text}>Queue</Text>
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}