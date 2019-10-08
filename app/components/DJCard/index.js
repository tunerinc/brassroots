'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {|
  isMenuOpen: boolean,
  ownerID: string,
  profileImage: string,
  toggleMenu: () => any,
  displayName: string,
|};

type State = {||};

export default class DJCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    const {isMenuOpen, ownerID} = this.props;
    const {isMenuOpen: nextIsMenuOpen, ownerID: nextOwnerID} = nextProps;
    return (ownerID !== nextOwnerID) || (isMenuOpen !== nextIsMenuOpen);
  }

  render() {
    const {isMenuOpen, toggleMenu, profileImage, displayName} = this.props;

    return (
      <TouchableOpacity style={styles.button} onPress={toggleMenu}>
        <View style={styles.info}>
          <FastImage style={styles.image} source={{uri: profileImage}} />
          <Text numberOfLines={1} style={styles.name}>
            {displayName}
          </Text>
        </View>
        <Ionicons name={isMenuOpen ? 'ios-arrow-up' : 'ios-arrow-down'} style={styles.icon} />
      </TouchableOpacity>
    );
  }
}