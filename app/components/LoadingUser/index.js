'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import Placeholder from 'rn-placeholder';
import styles from './styles';

type Props = {||};
type State = {||};

export default class LoadingUser extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.owner}>
        <View style={styles.image}>
          <Placeholder.Media
            animate='fade'
            size={60}
            hasRadius={true}
            color='#888'
          />
        </View>
        <View style={styles.name}>
          <Placeholder.Line
            animate='fade'
            textSize={20}
            lineSpacing={6}
            color='#888'
            width='100%'
          />
        </View>
      </View>
    );
  }
}