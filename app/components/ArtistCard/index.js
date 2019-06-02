'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {|
  artistImage: ?string,
  artistName: string,
  navToArtist: () => any,
  userTrackLength: number,
|};

type State = {||};

export default class ArtistCard extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {artistImage, artistName, navToArtist, userTrackLength} = this.props;

    return (
      <TouchableHighlight
        style={styles.artist}
        activeOpacity={0.5}
        underlayColor='#1b1b1e'
        onPress={navToArtist}
      >
        <View style={styles.wrap}>
          {artistImage !== '' &&
            <Image style={styles.image} source={{uri: artistImage}} />
          }
          {!artistImage || artistImage === '' &&
            <View style={styles.placeholder}>
              <Ionicons
                name='md-microphone'
                size={30}
                color='#fefefe'
                style={styles.artistIcon}
              />
            </View>
          }
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {artistName}
            </Text>
            {userTrackLength === 1 &&
              <Text numberOfLines={1} style={styles.count}>
                {userTrackLength} song
              </Text>
            }
            {userTrackLength !== 1 &&
              <Text numberOfLines={1} style={styles.count}>
                {userTrackLength} songs
              </Text>
            }
          </View>
          <Ionicons
            name='ios-arrow-forward'
            size={45}
            style={styles.arrow}
            color='#fefefe'
          />
        </View>
      </TouchableHighlight>
    );
  }
}