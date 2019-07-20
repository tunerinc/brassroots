'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {|
  deleteTrack?: () => any,
  deleting: boolean,
  disabled: boolean,
  error: ?boolean,
|};

type State = {||};

export default class DeleteQueueTrackButton extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {deleteTrack, deleting, disabled, error} = this.props;

    return (
      <TouchableOpacity style={styles.button} onPress={deleteTrack} disabled={disabled}>
        {deleting &&
          <ActivityIndicator
            style={styles.loading}
            animating={deleting}
            color='#888'
          />
        }
        {!deleting && !error &&
          <Ionicons
            name='md-close'
            size={30}
            color='#c0293b'
            style={styles.delete}
          />
        }
        {!deleting && error &&
          <MaterialIcons
            name='error'
            size={25}
            color='#c0293b'
            style={styles.error}
          />
        }
      </TouchableOpacity>
    );
  }
}