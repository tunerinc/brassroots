'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import FastImage from 'react-native-fast-image';
import {Text, View, TouchableHighlight} from 'react-native';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {|
  image: string,
  isMember: boolean,
  name: string,
  navToPlaylist: () => any,
  mode?: 'mode' | 'hidden' | 'vip',
  ownerName?: ?string,
|};

type State = {||};

export default class PlaylistCard extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {image, isMember, name, navToPlaylist, mode, ownerName} = this.props;

    return (
      <TouchableHighlight
        style={styles.playlist}
        activeOpacity={0.5}
        underlayColor='#1b1b1e'
        onPress={navToPlaylist}
      >
        <View style={styles.wrap}>
          {image !== '' && <FastImage style={styles.image} source={{uri: image}} />}
          {image === '' &&
            <View style={styles.default}>
              <FastImage style={styles.defaultImage} source={require('../../images/logo.png')} />
            </View>
          }
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {name}
            </Text>
            {typeof ownerName === 'string' &&
              <Text numberOfLines={1} style={styles.owner}>
                by {ownerName}
              </Text>
            }
          </View>
          <View style={styles.icons}>
            {isMember && <Ionicons name='md-person' color='#fefefe' style={styles.member} />}
            {mode === 'hidden' && <Octicons name='telescope' color='#fefefe' style={styles.mode} />}
            {mode === 'vip' && <Foundation name='ticket' color='#fefefe' style={styles.mode} />}
            {mode === 'limitless' &&
              <MaterialIcons name='all-inclusive' color='#fefefe' style={styles.mode} />
            }
          </View>
          <Ionicons name='ios-arrow-forward' style={styles.arrow} color='#fefefe' />
        </View>
      </TouchableHighlight>
    );
  }
}