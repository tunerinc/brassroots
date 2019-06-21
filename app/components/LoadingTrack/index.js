'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Placeholder from 'rn-placeholder';
import styles from './styles';

// Icons
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type Props = {|
  type: string,
|};

type State = {||};

export default class LoadingTrack extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {type} = this.props;

    return (
      <View style={styles.track}>
        {(type === 'cover' || type === 'favorite') &&
          <View style={styles.image}>
            <Placeholder.Media
              animate='fade'
              size={50}
              hasRadius={false}
              color='#888'
            />
          </View>
        }
        {(type === 'most' || type === 'album' || type === 'top') &&
          <View style={styles.position}>
            <Placeholder.Media
              animate='fade'
              size={18}
              hasRadius={true}
              color='#888'
            />
          </View>
        }
        <View style={styles.info}>
          <Placeholder.Paragraph
            animate='fade'
            lineNumber={2}
            textSize={18}
            lineSpacing={7.2}
            color='#888'
            width='100%'
          />
        </View>
        {type === 'most' &&
          <View style={styles.plays}>
            <Placeholder.Line
              animate='fade'
              textSize={18}
              lineSpacing={7.2}
              color='#888'
              width='100%'
            />
          </View>
        }
        {(type !== 'top' || type !== 'favorite' || !type) &&
          <SimpleLineIcons name='options' style={styles.options} color='#888' />
        }
        {type === 'favorite' &&
          <Foundation name='star' size={25} style={styles.favoriteTrackIcon} />
        }
      </View>
    );
  }
}