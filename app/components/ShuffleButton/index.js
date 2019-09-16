'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

type Props = {|
  disabled?: boolean,
|};

type State = {||};

export default class ShuffleButton extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {disabled} = this.props;

    return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor: disabled ? '#888' : '#2b6dc0'}]}
        disabled={disabled}
      >
        <Text style={styles.text}>SHUFFLE</Text>
      </TouchableOpacity>
    );
  }
}