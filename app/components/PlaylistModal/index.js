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
  closeModal: () => any,
  name: string,
  image: string,
  displayName?: ?string,
  isOwnerMember: boolean,
|};

type State = {||};

export default class PlaylistModal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {closeModal, name, image, displayName, isOwnerMember} = this.props;

    return (
      <View style={styles.modal}>
        <View style={styles.playlist}>
          <View style={styles.shadow}>
            <FastImage style={styles.image} source={{uri: image}} />
          </View>
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {name}
            </Text>
            {typeof displayName === 'string' &&
              <Text numberOfLines={1} style={styles.owner}>
                by {displayName}
              </Text>
            }
          </View>
        </View>
        {isOwnerMember &&
          <View>
            <View style={styles.option}>
              <TouchableHighlight
                style={styles.button}
                activeOpacity={0.5}
                underlayColor='#fefefe'
                disabled
              >
                <Text style={styles.text}>edit playlist</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.option}>
              <TouchableHighlight
                style={styles.button}
                activeOpacity={0.5}
                underlayColor='#fefefe'
                disabled
              >
                <Text style={styles.text}>invite</Text>
              </TouchableHighlight>
            </View>
          </View>
        }
        <View style={styles.option}>
          <TouchableHighlight style={styles.button} disabled>
            <Text style={styles.text}>copy share url</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight style={styles.button} disabled>
            <Text style={styles.text}>playlist settings</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight style={styles.button} disabled>
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