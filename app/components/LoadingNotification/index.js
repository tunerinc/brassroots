'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderMedia, PlaceholderLine, Fade} from 'rn-placeholder';
import styles from './styles';

type Props = {||};
type State = {||};

export default class LoadingNotification extends React.PureComponent<Props, State> {
  renderImage = () => <PlaceholderMedia isRound={true} style={styles.type} />;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.typeWrap}>
          <Placeholder Animate={Fade} Left={this.renderImage} />
        </View>
        <View style={styles.info}>
          <Placeholder Animate={Fade}>
            <View style={styles.top}>
              <View style={styles.images}>
                <PlaceholderMedia isRound={true} style={styles.image} />
                <PlaceholderMedia isRound={true} style={styles.image} />
                <PlaceholderMedia isRound={true} style={styles.image} />
                <PlaceholderMedia isRound={true} style={styles.image} />
              </View>
              <View style={styles.timestampWrap}>
                <PlaceholderLine width={100} style={styles.timestamp} />
              </View>
            </View>
            <View style={styles.bottom}>
              <PlaceholderLine width={100} style={[styles.text, styles.topText]} />
              <PlaceholderLine width={100} style={styles.text} />
            </View>
          </Placeholder>
        </View>
      </View>
    );
  }
}