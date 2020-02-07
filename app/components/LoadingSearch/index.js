'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import styles from './styles';

type Props = {||};
type State = {||};

export default class LoadingSearch extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Placeholder Animate={Fade}>
          <PlaceholderLine width={65} style={styles.text} />
        </Placeholder>
      </View>
    );
  }
}