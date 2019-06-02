'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {TouchableHighlight, Text, View, Image} from 'react-native';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {|
  albumImage?: string,
  albumName: string,
  artists: string,
  navToAlbum: () => any,
|};

type State = {||};

export default class AlbumCard extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {albumImage, albumName, artists, navToAlbum} = this.props;

    return (
      <TouchableHighlight
        style={styles.album}
        activeOpacity={0.5}
        underlayColor="#1b1b1e"
        onPress={navToAlbum}
      >
        <View style={styles.wrap}>
          <Image style={styles.image} source={{uri: albumImage}} />
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {albumName}
            </Text>
            <Text numberOfLines={1} style={styles.artists}>
              {artists}
            </Text>
          </View>
          <Ionicons
            name="ios-arrow-forward"
            size={35}
            style={styles.arrow}
            color="#fefefe"
          />
        </View>
      </TouchableHighlight>
    );
  }
}
