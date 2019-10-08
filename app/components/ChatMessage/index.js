'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, Text} from 'react-native';
import styles from './styles';

type Props = {|
  text: string,
  timestamp: string,
  image: string,
  isCurrentUser: boolean,
|};

type State = {||};

export default class ChatMessage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {text, timestamp, image, isCurrentUser} = this.props;
    const bubbleStyles = isCurrentUser ? styles.userBubble : styles.messageBubble;
    const infoStyles = isCurrentUser ? styles.userInfo : styles.messageInfo;
    const imageStyles = [styles.messageUser, ...(isCurrentUser ? [styles.userImage] : [])];

    return (
      <View style={styles.message}>
        <View>
          <View style={bubbleStyles}>
            <Text style={styles.messageText}>
              {text}
            </Text>
          </View>
          <View style={infoStyles}>
            <Text style={styles.messageTime}>
              {timestamp}
            </Text>
            <FastImage source={{uri: image}} style={imageStyles} />
          </View>
        </View>
      </View>
    );
  }
}