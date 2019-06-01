'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import Placeholder from 'rn-placeholder';
import styles from './styles';

type Props = {||};
type State = {||};

export default class LoadingNotification extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.type}>
          <Placeholder.Media
            animate='fade'
            size={20}
            hasRadius={true}
            color='#888'
          />
        </View>
        <View style={styles.info}>
          <View style={styles.top}>
            <View style={styles.images}>
              <Placeholder.Media
                animate='fade'
                size={40}
                hasRadius={true}
                color='#888'
              />
              <Placeholder.Media
                animate='fade'
                size={40}
                hasRadius={true}
                color='#888'
              />
              <Placeholder.Media
                animate='fade'
                size={40}
                hasRadius={true}
                color='#888'
              />
              <Placeholder.Media
                animate='fade'
                size={40}
                hasRadius={true}
                color='#888'
              />
            </View>
            <View style={styles.timestamp}>
              <Placeholder.Line
                animate='fade'
                textSize={16}
                lineSpacing={3.2}
                color='#888'
                width='100%'
              />
            </View>
          </View>
          <View style={styles.bottom}>
            <Placeholder.Paragraph
              animate='fade'
              lineNumber={2}
              textSize={20}
              lineSpacing={4}
              color='#888'
              width='100%'
            />
          </View>
        </View>
      </View>
    );
  }
}