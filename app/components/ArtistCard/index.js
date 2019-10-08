'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import FastImage from 'react-native-fast-image';
import {Text, View, TouchableHighlight} from 'react-native';
import {Placeholder, PlaceholderMedia, Fade} from 'rn-placeholder';
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

  renderImage = () => <PlaceholderMedia isRound={true} style={styles.image} />;

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
              <Placeholder Animate={Fade} Left={this.renderImage} />
            </View>
          }
          {(typeof artistImage === 'string' && artistImage !== '') &&
            <FastImage style={styles.image} source={{uri: artistImage}} />
          }
          {(!fetchingImage && (typeof artistImage !== 'string' || artistImage === '')) &&
            <View style={styles.default}>
              <FastImage style={styles.defaultImage} source={require('../../images/logo.png')} />
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
          <Ionicons name='ios-arrow-forward' style={styles.arrow} color='#fefefe' />
        </View>
      </TouchableHighlight>
    );
  }
}