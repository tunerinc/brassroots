'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableHighlight} from 'react-native';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../../config.json';
import {
  type Action,
  type Session,
} from '../../reducers/sessions';

const PartyIcon = createIconSetFromFontello(fontelloConfig);

type Props = {|
  +mode: 'dj' | 'radio' | 'party',
  +selected: boolean,
  +selectMode: (string) => any,
  +ownerID: ?string,
  +currentUserID: string,
|};

type State = {||};

export default class LiveSettingOption extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      mode,
      selected,
      selectMode,
      ownerID,
      currentUserID,
    } = this.props;

    return (
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.5}
        underlayColor='#1b1b1e'
        disabled={typeof ownerID === 'string' && ownerID !== currentUserID}
        onPress={selectMode(mode)}
      >
        <View style={styles.wrap}>
          {mode === 'dj' &&
            <MaterialCommunityIcons
              name='headphones'
              size={50}
              color={selected ? '#2b6dc0' : '#888'}
              style={styles.icon}
            />
          }
          {mode === 'radio' &&
            <Octicons
              name='radio-tower'
              size={50}
              color={selected ? '#2b6dc0' : '#888'}
              style={styles.icon}
            />
          }
          {mode === 'party' &&
            <PartyIcon
              name='party-01'
              size={50}
              color={selected ? '#2b6dc0' : '#888'}
              style={styles.icon}
            />
          }
          <View style={styles.info}>
            {mode === 'dj' &&
              <View>
                <Text style={styles.heading}>DJ Mode</Text>
                <View style={styles.item}>
                  <Text style={styles.bullet}>• </Text>
                  <Text style={styles.itemText}>Only the DJ may add songs</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bullet}>• </Text>
                  <Text style={styles.itemText}>Listeners may request to add songs to the queue</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bullet}>• </Text>
                  <Text style={styles.itemText}>Likes don't affect order</Text>
                </View>
              </View>
            }
            {mode === 'radio' &&
              <View>
                <Text style={styles.heading}>Radio Mode</Text>
                <View style={styles.item}>
                  <Text style={styles.bullet}>• </Text>
                  <Text style={styles.itemText}>Anyone may add songs</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bullet}>• </Text>
                  <Text style={styles.itemText}>The DJ's songs are added to the top of the queue</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bullet}>• </Text>
                  <Text style={styles.itemText}>Songs with more likes move up</Text>
                </View>
              </View>
            }
            {mode === 'party' &&
              <View>
                <Text style={styles.heading}>Party Mode</Text>
                <View style={styles.item}>
                  <Text style={styles.bullet}>• </Text>
                  <Text style={styles.itemText}>Anyone may add songs</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bullet}>• </Text>
                  <Text style={styles.itemText}>Songs are added to the queue in chronological order</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bullet}>• </Text>
                  <Text style={styles.itemText}>Songs with more likes move up</Text>
                </View>
              </View>
            }
          </View>
          {typeof ownerID === 'string' && ownerID === currentUserID && selected &&
            <Ionicons
              name='md-radio-button-on'
              size={45}
              color='#2b6dc0'
              style={styles.radio}
            />
          }
          {typeof ownerID === 'string' && ownerID === currentUserID && !selected &&
            <Ionicons
              name='md-radio-button-off'
              size={45}
              color='#fefefe'
              style={styles.radio}
            />
          }
          {typeof ownerID === 'string' && ownerID !== currentUserID && selected &&
            <Ionicons
              name='md-checkmark'
              size={45}
              color='#2b6dc0'
              style={styles.check}
            />
          }
          {typeof ownerID !== 'string' || (ownerID !== currentUserID && !selected) &&
            <View style={styles.check}></View>
          }
        </View>
      </TouchableHighlight>
    );
  }
}