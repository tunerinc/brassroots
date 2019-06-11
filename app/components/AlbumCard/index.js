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
import Foundation from 'react-native-vector-icons/Foundation';

type Props = {|
  albumImage: ?string,
  albumName: string,
  artists: string,
  navToAlbum: () => any,
  index?: number,
  count?: number,
|};

type State = {||};

export default class AlbumCard extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {albumImage, albumName, artists, navToAlbum, index, count} = this.props;

    return (
      <TouchableHighlight
        style={styles.album}
        activeOpacity={0.5}
        underlayColor="#1b1b1e"
        onPress={navToAlbum}
      >
        <View style={styles.wrap}>
          {typeof index !== 'number' && <Image style={styles.image} source={{uri: albumImage}} />}
          {typeof index === 'number' &&
            <View style={styles.position}>
              <Text style={styles.positionText}>
                {index + 1}
              </Text>
            </View>
          }
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {albumName}
            </Text>
            <Text numberOfLines={1} style={styles.artists}>
              {artists}
            </Text>
          </View>
          {typeof count === 'number' &&
            <View style={styles.count}>
              <Foundation name='play' color='#fefefe' style={styles.play} />
              <Text numberOfLines={1} style={styles.number}>
                {count}
              </Text>
            </View>
          }
          {typeof count !== 'number' &&
            <Ionicons name="ios-arrow-forward" style={styles.arrow} color="#fefefe" />
          }
        </View>
      </TouchableHighlight>
    );
  }
}
