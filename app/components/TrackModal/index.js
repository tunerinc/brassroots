'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';
import styles from './styles';

type Props = {|
  closeModal: () => void,
  queueTrack: () => void,
  name: string,
  artists: string,
  albumName: string,
  albumImage: string,
  trackID?: string,
  trackInQueue?: boolean,
  isListenerOwner?: ?boolean,
|};

type State = {||};

export default class TrackModal extends React.PureComponent<Props, State> {
  render() {
    const {
      closeModal,
      queueTrack,
      name,
      artists,
      albumName,
      albumImage,
      trackID,
      trackInQueue,
      isListenerOwner,
    } = this.props;

    if (!trackID) return <View></View>;

    return (
      <View style={styles.modal}>
        <View style={styles.track}>
          <View style={styles.shadow}>
            <Image style={styles.image} source={{uri: albumImage}} />
          </View>
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {name}
            </Text>
            <Text numberOfLines={1} style={styles.bottom}>
              {artists} • {albumName}
            </Text>
          </View>
        </View>
        <View style={styles.option}>
          {(typeof isListenerOwner === 'boolean' && isListenerOwner) &&
            <View>
              {!trackInQueue &&
                <TouchableHighlight
                  style={styles.button}
                  activeOpacity={0.5}
                  underlayColor='#fefefe'
                  onPress={queueTrack}
                >
                  <Text style={styles.text}>add to queue</Text>
                </TouchableHighlight>
              }
              {trackInQueue &&
                <TouchableHighlight style={styles.button} disabled={true}>
                  <Text style={[styles.text, styles.disabled]}>queued</Text>
                </TouchableHighlight>
              }
            </View>
          }
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled={true}
          >
            <Text style={styles.text}>add to playlist</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled={true}
          >
            <Text style={styles.text}>share</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled={true}
          >
            <Text style={styles.text}>copy share url</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled={true}
          >
            <Text style={styles.text}>go to album</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled={true}
          >
            <Text style={styles.text}>go to artist</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled={true}
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