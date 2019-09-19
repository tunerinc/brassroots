'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Placeholder, PlaceholderMedia, PlaceholderLine, Fade} from 'rn-placeholder';
import styles from './styles';

// Icons
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type Props = {|type: string|};
type State = {||};

export default class LoadingTrack extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  renderImage = () => <PlaceholderMedia style={styles.image} />;
  renderPosition = () => <PlaceholderMedia isRound={true} style={styles.position} />;

  render() {
    const {type} = this.props;
    const topStyles = [styles.text, styles.topText];
    const showOptions: boolean = (type !== 'top' && type !== 'favorite') || typeof type !== 'string';
    const showPosition: boolean = type === 'most' || type === 'album' || type === 'top';
    const showImage: boolean = type === 'cover' || type === 'favorite';

    return (
      <View style={styles.track}>
        {showImage &&
          <View style={styles.imageWrap}>
            <Placeholder Animate={Fade} Left={this.renderImage} />
          </View>
        }
        {showPosition &&
          <View style={styles.positionWrap}>
            <Placeholder Animate={Fade} Left={this.renderPosition} />
          </View>
        }
        <View style={styles.info}>
          <Placeholder Animate={Fade}>
            <PlaceholderLine width={100} style={topStyles} />
            <PlaceholderLine width={100} style={styles.text} />
          </Placeholder>
        </View>
        {type === 'most' &&
          <View style={styles.playsWrap}>
            <Placeholder Animate={Fade}>
              <PlaceholderLine width={100} style={styles.plays} />
            </Placeholder>
          </View>
        }
        {type === 'favorite' && <Foundation name='star' style={styles.favoriteIcon} />}
        {showOptions && <SimpleLineIcons name='options' style={styles.options} />}
      </View>
    );
  }
}