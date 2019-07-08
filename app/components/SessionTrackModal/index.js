'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import styles from './styles';

type Props = {|
  closeModal: () => any,
|};

type State = {||};

export default class SessionTrackModal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {closeModal} = this.props;
    
    return (
      <View style={styles.modal}>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled
          >
            <Text style={styles.optionText}>save to library</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled
          >
            <Text style={styles.optionText}>add to playlist</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled
          >
            <Text style={styles.optionText}>copy share url</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled
          >
            <Text style={styles.optionText}>go to album</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            disabled
          >
            <Text style={styles.optionText}>go to artist</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.cancel}>
          <TouchableHighlight
            style={styles.cancelButton}
            activeOpacity={0.5}
            underlayColor='#fefefe'
            onPress={closeModal}
          >
            <Text style={styles.optionText}>cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}