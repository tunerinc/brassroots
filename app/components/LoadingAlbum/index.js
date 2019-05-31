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

export default class LoadingAlbum extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.album}>
        <View style={styles.image}>
          <Placeholder.ImageContent
            animate='fade'
            size={50}
            position='left'
            hasRadius={false}
            lineNumber={2}
            textSize={18}
            lineSpacing={7.2}
            color='#888'
          />
        </View>
        <View style={styles.info}>
          <Placeholder.Paragraph
            animate='fade'
            lineNumber={2}
            textSize={18}
            lineSpacing={7.2}
            color='#888'
            width='100%'
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
  };
};