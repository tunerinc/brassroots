'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {|
  disabled: boolean,
  liked: boolean,
  showCount: boolean,
  toggleLike: () => any,
  totalLikes: number,
|};

type State = {||};

export default class LikeButton extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {disabled, liked, showCount, toggleLike, totalLikes} = this.props;

    return (
      <TouchableOpacity style={styles.button} onPress={toggleLike} disabled={disabled}>
        {liked &&
          <Ionicons
            name='md-heart'
            color='#c0392b'
            style={styles.like}
          />
        }
        {!liked &&
          <Ionicons
            name='md-heart'
            color='#888'
            style={styles.like}
          />
        }
        {showCount && totalLikes > 99 &&
          <Text style={[
            styles.count,
            liked ? styles.red : styles.gray,
          ]}>
            99+
          </Text>
        }
        {showCount && totalLikes <= 99 &&
          <Text style={[
            styles.count,
            liked ? styles.red : styles.gray,
          ]}>
            {totalLikes}
          </Text>
        }
      </TouchableOpacity>
    );
  }
}