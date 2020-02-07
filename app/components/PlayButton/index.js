'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import {type ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

// Icons
import Foundation from 'react-native-vector-icons/Foundation';

type Props = {|
  play: () => void,
  disabled: boolean,
|};

type State = {||};

export default class PlayButton extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {play, disabled} = this.props;
    const buttonStyles: Array<ViewStyleProp> = [
      styles.button,
      {backgroundColor: disabled ? '#888' : '#2b6dc0'},
    ];

    return (
      <TouchableOpacity onPress={play} disabled={disabled || false} style={buttonStyles}>
        <Foundation name='play' style={styles.icon} />
      </TouchableOpacity>
    );
  }
}