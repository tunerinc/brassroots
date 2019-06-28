'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import Placeholder from 'rn-placeholder';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {||};
type State = {||};

export default class LoadingArtist extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.artist}>
        <View style={styles.image}>
          <Placeholder.Media
            animate='fade'
            size={55}
            hasRadius={true}
            color='#888'
          />
        </View>
        <View style={styles.info}>
          <Placeholder.Paragraph
            animate='fade'
            lineNumber={2}
            textSize={16}
            lineSpacing={6.2}
            color='#888'
            width='100%'
            lastLineWidth='30%'
          />
        </View>
        <Ionicons name='ios-arrow-forward' style={styles.arrow} color='#888' />
      </View>
    );
  }
}