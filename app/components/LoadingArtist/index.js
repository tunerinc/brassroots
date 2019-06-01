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

type Props = {};
type State = {};

export default class LoadingArtist extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.artist}>
        <View style={styles.image}>
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
        <View style={styles.info}>
          <Placeholder.Paragraph
            animate='fade'
            lineNumber={2}
            textSize={20}
            lineSpacing={4}
            color='#888'
            width='100%'
            lastLineWidth='30%'
          />
        </View>
        <Ionicons
          name='ios-arrow-forward'
          size={45}
          style={styles.arrow}
          color='#888'
        />
      </View>
    );
  }
}