'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import Placeholder from 'rn-placeholder';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {|
  showIndex?: boolean,
|};
type State = {||};

export default class LoadingAlbum extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {showIndex} = this.props;

    return (
      <View style={styles.album}>
        {typeof showIndex === 'boolean' && showIndex &&
          <View style={styles.position}>
            <Placeholder.Media
              animate='fade'
              size={14}
              hasRadius={true}
              color='#888'
            />
          </View>
        }
        {typeof showIndex !== 'boolean' &&
          <View style={styles.image}>
            <Placeholder.Media
              animate='fade'
              size={55}
              hasRadius={false}
              color='#888'
            />
          </View>
        }
        <View style={styles.info}>
          <Placeholder.Paragraph
            animate='fade'
            lineNumber={2}
            textSize={16}
            lineSpacing={6.4}
            color='#888'
            width='100%'
          />
        </View>
        <Ionicons name='ios-arrow-forward' style={styles.arrow} />
      </View>
    );
  }
}