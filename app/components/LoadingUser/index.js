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

export default class LoadingUser extends React.PureComponent<Props, State> {
  renderImage = () => <PlaceholderMedia isRound={true} style={styles.image} />;

  render() {
    return (
      <View style={styles.owner}>
        <Placeholder Animate={Fade} Left={this.renderImage}>
          <PlaceholderLine width={100} style={styles.name} />
        </Placeholder>
      </View>
    );
  }
}