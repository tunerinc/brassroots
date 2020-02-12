'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, Text, TouchableHighlight} from 'react-native';
import styles from './styles';

type Props = {|
  closeModal: () => void,
  isFollowing: boolean,
  profileImage?: string,
  displayName?: string,
|};

type State = {||};

export default class SessionModal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {isFollowing, closeModal, profileImage, displayName} = this.props;

    return (
      <View style={styles.modal}>
        {(displayName && profileImage) &&
          <View style={styles.wrap}>
            <View style={styles.user}>
              <View style={styles.shadow}>
                <FastImage style={styles.image} source={{uri: profileImage}} />
              </View>
              <Text style={styles.displayName}>
                {displayName}
              </Text>
              <Text style={styles.live}>LIVE</Text>
            </View>
            <View style={styles.option}>
              <TouchableHighlight
                style={styles.button}
                activeOpacity={0.5}
                underlayColor='#fefefe'
                disabled
              >
                <View style={styles.wrap}>
                  {!isFollowing && <Text style={styles.text}>follow</Text>}
                  {isFollowing && <Text style={styles.text}>unfollow</Text>}
                </View>
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
            <View style={styles.option}>
              <TouchableHighlight
                style={styles.button}
                activeOpacity={0.5}
                underlayColor='#fefefe'
                disabled
              >
                <Text style={[styles.text, styles.danger]}>report</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.cancel}>
              <TouchableHighlight
                style={styles.cancelButton}
                activeOpacity={0.5}
                underlayColor='#fefefe'
                onPress={closeModal}
              >
                <Text style={styles.text}>cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        }
      </View>
    );
  }
}