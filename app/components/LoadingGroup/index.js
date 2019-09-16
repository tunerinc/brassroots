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

export default class LoadingGroup extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Placeholder.Media
            animate='fade'
            size={60}
            hasRadius={true}
            color='#888'
          />
        </View>
        <View style={styles.info}>
          <Placeholder.Line
            animate='fade'
            textSize={20}
            lineSpacing={4}
            color='#888'
            width='100%'
          />
        </View>
        <Ionicons
          name='ios-arrow-forward'
          size={45}
          style={styles.arrowForward}
          color='#888'
        />
      </View>
    );
  }
}