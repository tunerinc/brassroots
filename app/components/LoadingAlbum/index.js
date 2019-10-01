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

type Props = {|showIndex?: boolean|};
type State = {||};

export default class LoadingAlbum extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  renderImage = () => <PlaceholderMedia style={styles.image} />;
  renderPosition = () => <PlaceholderMedia isRound={true} style={styles.position} />;

  render() {
    const {showIndex} = this.props;
    const topStyles = [styles.text, styles.topText];

    return (
      <View style={styles.album}>
        {typeof showIndex !== 'boolean' &&
          <View style={styles.imageWrap}>
            <Placeholder Animate={Fade} Left={this.renderImage} />
          </View>
        }
        {typeof showIndex === 'boolean' && showIndex &&
          <View style={styles.positionWrap}>
            <Placeholder Animate={Fade} Left={this.renderPosition} />
          </View>
        }
        <View style={styles.info}>
          <Placeholder Animate={Fade}>
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