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

export default class LoadingConversation extends React.PureComponent<Props, State> {
  renderImage = () => <PlaceholderMedia isRound={true} style={styles.image} />;

  render() {
    const topStyles = [styles.text, styles.topText];

    return (
      <View style={styles.container}>
        <View style={styles.imageWrap}>
          <Placeholder Animate={Fade} Left={this.renderImage} />
        </View>
        <View style={styles.info}>
          <View style={styles.header}>
            <View style={styles.memberWrap}>
              <Placeholder Animate={Fade}>
                <PlaceholderLine width={100} style={styles.text} />
              </Placeholder>
            </View>
            <View style={styles.timestampWrap}>
              <Placeholder Animate={Fade}>
                <PlaceholderLine width={100} style={styles.timestamp} />
              </Placeholder>
            </View>
          </View>
          <View style={styles.content}>
            <Placeholder Animate={Fade}>
              <PlaceholderLine width={100} style={topStyles} />
              <PlaceholderLine width={100} style={styles.text} />
            </Placeholder>
          </View>
        </View>
      </View>
    );
  }
}