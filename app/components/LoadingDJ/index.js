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

export default class LoadingDJ extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Placeholder.Media
            animate='fade'
            size={30}
            hasRadius={true}
            color='#888'
          />
        </View>
        <View style={styles.name}>
          <Placeholder.Line
            animate='fade'
            textSize={16}
            lineSpacing={20.8}
            color='#888'
            width='100%'
          />
        </View>
      </View>
    );
  }
}