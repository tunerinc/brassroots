'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

type Props = {||};

type State = {||};

export default class ShuffleButton extends React.PureComponent<Props, State> {
  render() {
    return (
      <TouchableOpacity style={styles.button} disabled>
        <Text style={styles.text}>SHUFFLE</Text>
      </TouchableOpacity>
    );
  }
}