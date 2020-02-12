'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {|
  action: () => any,
  title: string,
|};

type State = {||};

export default class UserSettingOption extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {action, title} = this.props;

    return (
      <View style={styles.option}>
        <TouchableOpacity style={styles.button} onPress={action}>
          <View style={styles.wrap}>
            <Text style={styles.text}>
              {title}
            </Text>
            <Ionicons name='ios-arrow-forward' style={styles.arrow} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}