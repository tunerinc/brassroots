'use strict';

/**
 * @format
 * @flow
 */

import * as React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderMedia, PlaceholderLine, Fade} from 'rn-placeholder';
import styles from './styles';

// Icons
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type Props = {||};
type State = {||};

export default class LoadingSession extends React.PureComponent<Props, State> {
  renderImage = () => <PlaceholderMedia isRound={true} style={styles.image} />;
  renderIcon = () => <PlaceholderMedia isRound={true} style={styles.icon} />;

  render() {
    const topStyles = [styles.text, styles.topText];

    return (
      <View style={styles.session}>
        <View style={styles.header}>
          <Placeholder Animate={Fade}>
            <View style={styles.owner}>
              <PlaceholderLine width={65} style={styles.headerText} />
            </View>
            <View style={styles.live}>
              <PlaceholderLine width={100} style={styles.headerText} />
            </View>
          </Placeholder>
        </View>
        <View style={styles.info}>
          <Placeholder Animate={Fade} Left={this.renderImage}>
            <PlaceholderLine width={100} style={topStyles} />
            <PlaceholderLine width={100} style={styles.text} />
          </Placeholder>
        </View>
        <View style={styles.footer}>
          <Placeholder Animate={Fade} Left={this.renderIcon}>
            <PlaceholderLine width={100} style={styles.iconText} />
          </Placeholder>
          <Placeholder Animate={Fade} Left={this.renderIcon}>
            <PlaceholderLine width={100} style={styles.iconText} />
          </Placeholder>
          <Placeholder Animate={Fade} Left={this.renderIcon}>
            <PlaceholderLine width={100} style={styles.iconText} />
          </Placeholder>
          <SimpleLineIcons name='options' style={styles.options} />
        </View>
      </View>
    );
  }
}