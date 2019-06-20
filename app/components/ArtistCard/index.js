'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import Placeholder from 'rn-placeholder';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {|
  artistImage: ?string,
  artistName: string,
  navToArtist: () => any,
  userTrackLength?: number,
  fetchingImage?: boolean,
|};

type State = {||};

export default class ArtistCard extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {artistImage, artistName, navToArtist, userTrackLength, fetchingImage} = this.props;

    return (
      <TouchableHighlight
        style={styles.artist}
        activeOpacity={0.5}
        underlayColor='#1b1b1e'
        onPress={navToArtist}
      >
        <View style={styles.wrap}>
          {(fetchingImage && (typeof artistImage !== 'string' || artistImage === '')) &&
            <View style={styles.loading}>
              <Placeholder.ImageContent
                animate='fade'
                size={60}
                position='left'
                hasRadius={true}
                lineNumber={1}
                textSize={20}
                lineSpacing={4}
                color='#888'
              />
            </View>
          }
          {(typeof artistImage === 'string' && artistImage !== '') &&
            <Image style={styles.image} source={{uri: artistImage}} />
          }
          {(typeof artistImage !== 'string' || artistImage === '') &&
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
            {(typeof userTrackLength === 'number' && userTrackLength === 1) &&
              <Text numberOfLines={1} style={styles.count}>
                {userTrackLength} song
              </Text>
            }
            {(typeof userTrackLength === 'number' && userTrackLength !== 1) &&
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