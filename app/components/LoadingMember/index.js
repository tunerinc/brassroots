'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderMedia, PlaceholderLine, Fade} from 'rn-placeholder';
import styles from './styles';

type Props = {|marginLeft: ?number|};
type State = {||};

export default class LoadingMember extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {marginLeft} = this.props;
    const containerStyles = [styles.container, {marginLeft: marginLeft || 0}];

    return (
      <View style={containerStyles}>
        <Placeholder Animate={Fade}>
          <View style={styles.imageWrap}>
            <PlaceholderMedia isRound={true} style={styles.image} />
          </View>
        </Placeholder>
        <Placeholder Animate={Fade}>
          <PlaceholderLine width={100} style={styles.text} />
        </Placeholder>
      </View>
    );
  }
}