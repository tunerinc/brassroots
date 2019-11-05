'use strict';

/**
 * @format
 * @flow
 */

import * as React from 'react';
import {View, Text, TouchableOpacity, Easing} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type Props = {|
  trackID: string,
  name: string,
  saved: boolean,
  artists: string,
  displayName: ?string,
  openModal: () => any,
|};

type State = {||};

export default class SessionTrack extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    const {trackID, displayName} = this.props;
    const {trackID: newTrackID, displayName: oldName} = nextProps;
    return trackID !== newTrackID || displayName !== oldName;
  }

  render() {
    const {name, displayName, artists, openModal, saved} = this.props;

    return (
      <View style={styles.track}>
        {/* <TouchableOpacity style={styles.action} disabled={true}>
          {saved && <Ionicons name='md-checkmark' color='#2b6dc0' style={styles.check} />}
          {!saved && <MaterialCommunityIcons name='plus' color='#fefefe' style={styles.plus} />}
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.info} disabled={true}>
          <TextTicker
            numberOfLines={1}
            style={styles.nameArtists}
            scroll={false}
            bounce={false}
            animationType='bounce'
            duration={200 * [...name, '•', ...artists].length}
            marqueeDelay={3000}
            easing={Easing.linear}
          >
            <Text style={styles.name}>
              {name}
            </Text>
            <Text style={styles.separator}> • </Text>
            <Text style={styles.artists}>
              {artists}
            </Text>
          </TextTicker>
          {typeof displayName === 'string' &&
            <Text numberOfLines={1} style={styles.user}>
              {displayName}
            </Text>
          }
          {typeof displayName !== 'string' &&
            <View style={styles.loadWrap}>
              <Placeholder Animate={Fade}>
                <PlaceholderLine width={100} style={styles.loadingName} />
              </Placeholder>
            </View>
          }
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.optionsButton} onPress={openModal} activeOpacity={0.5}>
          <SimpleLineIcons name='options' style={styles.options} />
        </TouchableOpacity> */}
      </View>
    );
  }
}