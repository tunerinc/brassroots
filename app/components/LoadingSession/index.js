'use strict';

/**
 * @format
 * @flow
 */

import * as React from 'react';
import {View} from 'react-native';
import Placeholder from 'rn-placeholder';
import styles from './styles';

// Icons
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type Props = {||};
type State = {||};

export default class LoadingSession extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.session}>
        <View style={styles.header}>
          <View style={styles.owner}>
            <Placeholder.Line
              animate='fade'
              textSize={20}
              lineSpacing={4}
              color='#888'
              width='65%'
            />
          </View>
          <View style={styles.live}>
            <Placeholder.Line
              animate='fade'
              textSize={20}
              lineSpacing={4}
              color='#888'
            />
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.image}>
            <Placeholder.ImageContent
              animate='fade'
              size={60}
              position='left'
              hasRadius={true}
              lineNumber={2}
              textSize={20}
              lineSpacing={4}
              color='#888'
            />
          </View>
          <View style={styles.track}>
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
        <View style={styles.footer}>
          {renderAction()}
          {renderAction()}
          {renderAction()}
          <SimpleLineIcons
            name='options'
            size={35}
            style={styles.options}
            color='#888'
          />
        </View>
      </View>
    );
  }
}

function renderAction(): React.Node {
  return (
    <View style={styles.action}>
      <Placeholder.Media
        animate='fade'
        size={20}
        color='#888'
        hasRadius={true}
      />
      <View style={styles.text}>
        <Placeholder.Line
          animate='fade'
          textSize={18}
          lineSpacing={3.6}
          color='#888'
        />
      </View>
    </View>
  );
}