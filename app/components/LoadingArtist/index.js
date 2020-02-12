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

export default class LoadingArtist extends React.PureComponent<Props, State> {
  renderImage = () => <PlaceholderMedia isRound={true} style={styles.image} />;

  render() {
    const topStyles = [styles.text, styles.topText];

    return (
      <View style={styles.artist}>
        <Placeholder Animate={Fade} Left={this.renderImage}>
          <PlaceholderLine width={100} style={topStyles} />
          <PlaceholderLine width={30} style={styles.text} />
        </Placeholder>
        <Ionicons name='ios-arrow-forward' style={styles.arrow} />
      </View>
    );
  }
}