'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderMedia, PlaceholderLine, Fade} from 'rn-placeholder';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {||};
type State = {||};

export default class LoadingDJ extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Placeholder Animate={Fade}>
          <View style={styles.wrap}>
            <PlaceholderMedia isRound={true} style={styles.image} />
            <PlaceholderLine width={50} style={styles.text} />
          </View>
        </Placeholder>
        <Ionicons name='ios-arrow-down' style={styles.icon} />
      </View>
    );
  }
}