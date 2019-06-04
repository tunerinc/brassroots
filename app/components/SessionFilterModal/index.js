'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableHighlight} from 'react-native';
import moment from 'moment';
import styles from './styles';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {|
  changeFilter: (string) => void,
  getSessions: () => void,
  filter: string,
  timeDiff: number,
  totalSessions: number,
|};

type State = {||};

export default class SessionFilterModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    const {filter} = this.props;
    const {filter: newFilter} = nextProps;
    return filter !== newFilter;
  }

  componentDidUpdate() {
    const {getSessions, timeDiff, totalSessions} = this.props;

    if (timeDiff >= 5 || totalSessions === 0) {
      getSessions();
    }
  }

  render() {
    const {changeFilter, filter} = this.props;
    const followingColor: string = filter === 'following' ? '#2b6dc0' : '#323232';
    const followingActive: boolean = filter === 'following';
    const trendingColor: string = filter === 'trending' ? '#2b6dc0' : '#323232';
    const trendingActive: boolean = filter === 'trending';
    const nearbyColor: string = filter === 'nearby' ? '#2b6dc0' : '#323232';
    const nearbyActive: boolean = filter === 'nearby';

    return (
      <View style={styles.modal}>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={1}
          underlayColor='#fefefe'
          onPress={changeFilter('following')}
          disabled={followingActive}
        >
          <View style={styles.option}>
            <MaterialIcons name='group' color={followingColor} style={styles.icon} />
            <Text
              style={[
                styles.text,
                {color: followingColor},
              ]}
            >following</Text>
            {followingActive &&
              <Ionicons name='md-checkmark' color='#2b6dc0' style={styles.check} />
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={1}
          underlayColor='#fefefe'
          onPress={changeFilter('trending')}
          disabled={trendingActive}
        >
          <View style={styles.option}>
            <MaterialCommunityIcons name='chart-line' color={trendingColor} style={styles.icon} />
            <Text
              style={[
                styles.text,
                {color: trendingColor}
              ]}
            >trending</Text>
            {trendingActive &&
              <Ionicons
                name='md-checkmark'
                color='#2b6dc0'
                style={styles.check}
              />
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={1}
          underlayColor='#fefefe'
          onPress={changeFilter('nearby')}
          disabled={nearbyActive}
        >
          <View style={styles.option}>
            <Ionicons name='md-pin' color={nearbyColor} style={styles.icon} />
            <Text
              style={[
                styles.text,
                {color: nearbyColor}
              ]}
            >nearby</Text>
            {nearbyActive && <Ionicons name='md-checkmark' color='#2b6dc0' style={styles.check} />}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}