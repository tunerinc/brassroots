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
  renderImage = () => <PlaceholderMedia isRound={true} style={styles.image} />;

  render() {
    return (
      <View style={styles.container}>
        <Placeholder Animate={Fade} Left={this.renderImage}>
          <PlaceholderLine width={50} style={styles.text} />
        </Placeholder>
        <Ionicons name='ios-arrow-down' style={styles.icon} />
      </View>
    );
  }
}