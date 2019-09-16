'use strict';

/**
 * @format
 * @flow
 */

import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../../config.json';

const PartyIcon = createIconSetFromFontello(fontelloConfig);

type Props = {|mode: string|};
type State = {||};

export default class SessionModeIcon extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {mode} = this.props;

    return (
      <TouchableOpacity style={styles.button} disabled={true}>
        {mode === 'dj' && <MaterialCommunityIcons name='headphones' style={styles.icon} />}
        {mode === 'radio' && <Octicons name='radio-tower' style={styles.icon} />}
        {mode === 'party' && <PartyIcon name='party-01' style={styles.icon} />}
      </TouchableOpacity>
    );
  }
}