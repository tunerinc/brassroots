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

export default class LoadingSearch extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Placeholder.Line
          animate='fade'
          textSize={20}
          lineSpacing={4}
          width='65%'
          color='#888'
        />
      </View>
    );
  }
}