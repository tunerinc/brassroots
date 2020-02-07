'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, TouchableHighlight, TouchableOpacity, Animated} from 'react-native';
import styles from './styles';

type Props = {|
  backdropOpacity: number,
  height: number,
  isCurrentUser: boolean,
  optionsOpacity: number,
  zIndex: number,
  leave: () => any,
  navToSettings: () => any,
  toggleMenu: () => any,
|};

type State = {||};

export default class DJModal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      backdropOpacity,
      height,
      isCurrentUser,
      optionsOpacity,
      zIndex,
      leave,
      navToSettings,
      toggleMenu,
    } = this.props;

    return (
      <Animated.View style={[styles.options, {zIndex}]}>
        <Animated.View style={[styles.menu, {height}]}>
          <Animated.View style={[styles.opacity, {opacity: optionsOpacity}]}>
            {/* <View style={styles.option}>
              {isCurrentUser &&
                <TouchableHighlight
                  style={styles.button}
                  activeOpacity={0.5}
                  underlayColor='#fefefe'
                  onPress={navToSettings}
                  disabled
                >
                  <Text style={styles.text}>change mode</Text>
                </TouchableHighlight>
              }
              {!isCurrentUser &&
                <TouchableHighlight
                  style={styles.button}
                  activeOpacity={0.5}
                  underlayColor='#fefefe'
                  disabled
                >
                  <Text style={styles.text}>go to profile</Text>
                </TouchableHighlight>
              }
            </View>
            <View style={styles.option}>
              {isCurrentUser &&
                <TouchableHighlight
                  style={styles.button}
                  activeOpacity={0.5}
                  underlayColor='#fefefe'
                  disabled
                >
                  <Text style={styles.text}>change dj</Text>
                </TouchableHighlight>
              }
              {!isCurrentUser &&
                <TouchableHighlight
                  style={styles.button}
                  activeOpacity={0.5}
                  underlayColor='#fefefe'
                  onPress={navToSettings}
                >
                  <Text style={styles.text}>view live settings</Text>
                </TouchableHighlight>
              }
            </View>
            <View style={styles.option}>
              <TouchableHighlight
                style={styles.button}
                activeOpacity={0.5}
                underlayColor='#fefefe'
                disabled
              >
                <Text style={styles.text}>share session</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.option}>
              <TouchableHighlight
                style={styles.button}
                activeOpacity={0.5}
                underlayColor='#fefefe'
                disabled
              >
                <Text style={styles.text}>copy share url</Text>
              </TouchableHighlight>
            </View>
            {isCurrentUser &&
              <View style={styles.option}>
                <TouchableHighlight
                  style={styles.button}
                  activeOpacity={0.5}
                  underlayColor='#fefefe'
                  disabled
                >
                  <Text style={styles.text}>kick user</Text>
                </TouchableHighlight>
              </View>
            } */}
            <View style={styles.option}>
              <TouchableHighlight
                style={styles.button}
                activeOpacity={0.5}
                underlayColor='#fefefe'
                onPress={leave}
              >
                <Text style={[styles.text, {color: '#c0293b'}]}>leave</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.close}>
              <TouchableHighlight
                style={styles.closeButton}
                activeOpacity={0.5}
                underlayColor='#fefefe'
                onPress={toggleMenu}
              >
                <Text style={styles.text}>close</Text>
              </TouchableHighlight>
            </View>
          </Animated.View>
        </Animated.View>
        <TouchableOpacity style={styles.backdropButton} onPress={toggleMenu}>
          <Animated.View style={[styles.backdrop, {opacity: backdropOpacity}]}></Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}