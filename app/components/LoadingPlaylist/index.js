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

export default class LoadingPlaylist extends React.PureComponent<Props, State> {
  renderImage = () => <PlaceholderMedia style={styles.image} />;

  render() {
    const topStyles = [styles.text, styles.topText];

    return (
      <View style={styles.playlist}>
        <View style={styles.wrap}>
          <Placeholder Animate={Fade} Left={this.renderImage}>
            <View style={styles.placeholderWrap}>
              <PlaceholderLine width={100} style={topStyles} />
              <PlaceholderLine width={100} style={styles.text} />
            </View>
          </Placeholder>
        </View>
        <Ionicons name='ios-arrow-forward' style={styles.arrow} />
      </View>
    );
  }
}