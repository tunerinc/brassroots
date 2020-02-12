'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import FastImage from 'react-native-fast-image';
import {Text, View, TouchableHighlight} from 'react-native';
import styles from './styles';

type Props = {|
  artistImage: string,
  artistName: string,
  closeModal: () => any,
|};

type State = {||};

export default class ArtistModal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {artistImage, artistName, closeModal} = this.props;

    return (
      <View style={styles.modal}>
        <View style={styles.artist}>
          <View style={styles.shadow}>
            <FastImage style={styles.image} source={{uri: artistImage}} />
          </View>
          <Text numberOfLines={1} style={styles.name}>
            {artistName}
          </Text>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled
          >
            <Text style={styles.text}>share</Text>
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
            <Text style={styles.text}>go to artist</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled
          >
            <Text style={[styles.text, styles.danger]}>delete</Text>
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
    );
  }
}