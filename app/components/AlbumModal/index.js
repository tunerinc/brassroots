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
  albumImage: string,
  albumName: string,
  artists: string,
  closeModal: () => any,
|};

type State = {||};

export default class AlbumModal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {albumImage, albumName, artists, closeModal} = this.props;

    return (
      <View style={styles.modal}>
        <View style={styles.album}>
          <View style={styles.shadow}>
            <FastImage style={styles.image} source={{uri: albumImage}} />
          </View>
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {albumName}
            </Text>
            <Text numberOfLines={1} style={styles.artists}>
              {artists}
            </Text>
          </View>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor='#fefefe'
            style={styles.button}
            disabled
          >
            <Text style={styles.text}>add to playlist</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor='#fefefe'
            style={styles.button}
            disabled
          >
            <Text style={styles.text}>share</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor='#fefefe'
            style={styles.button}
            disabled
          >
            <Text style={styles.text}>copy share url</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor='#fefefe'
            style={styles.button}
            disabled
          >
            <Text style={styles.text}>go to album</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor='#fefefe'
            style={styles.button}
            disabled
          >
            <Text style={styles.text}>go to artist</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor='#fefefe'
            style={styles.button}
            disabled
          >
            <Text style={[styles.text, styles.danger]}>delete</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.cancel}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor='#fefefe'
            style={styles.cancelButton}
            onPress={closeModal}
          >
            <Text style={styles.text}>cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}