'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import Placeholder from 'rn-placeholder';
import styles from './styles';

type Props = {
  marginLeft: ?number,
};

type State = {};

export default class LoadingMember extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {marginLeft} = this.props;

    return (
      <View
        style={[
          styles.container,
          {marginLeft: marginLeft || 0}
        ]}
      >
        <View style={styles.image}>
          <Placeholder.Media
            animate='fade'
            size={60}
            color='#888'
            hasRadius={true}
          />
        </View>
        <View>
          <Placeholder.Line
            animate='fade'
            textSize={20}
            lineSpacing={6}
            color='#888'
          />
        </View>
      </View>
    );
  }
}