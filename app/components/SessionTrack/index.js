'use strict';

/**
 * @format
 * @flow
 */

import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type Props = {|
  currentTrackID: string,
  currentTrackNumber: number,
  name: string,
  saved: boolean,
  artists: string,
  displayName: string,
  openModal: () => any,
|};

type State = {||};

export default class SessionTrack extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    const {currentTrackID, currentTrackNumber} = this.props;
    const {currentTrackID: newTrackID, currentTrackNumber: newTrackNumber} = nextProps;
    return currentTrackID !== newTrackID || currentTrackNumber !== newTrackNumber;
  }

  render() {
    const {name, displayName, artists, openModal, saved} = this.props;

    return (
      <View style={styles.track}>
        <TouchableOpacity style={styles.action} disabled={true}>
          {saved && <Ionicons name='md-checkmark' color='#2b6dc0' style={styles.check} />}
          {!saved && <MaterialCommunityIcons name='plus' color='#fefefe' style={styles.plus} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.info} disabled={true}>
          <Text numberOfLines={1} style={styles.nameArtists}>
            <Text style={styles.name}>
              {name}
            </Text>
            <Text style={styles.separator}> • </Text>
            <Text style={styles.artists}>
              {artists}
            </Text>
          </Text>
          <Text numberOfLines={1} style={styles.user}>
            {displayName}
          </Text>
        </TouchableOpacity>
        <SimpleLineIcons
          name='options'
          size={35}
          color='#fefefe'
          style={styles.options}
          onPress={openModal}
        />
      </View>
    );
  }
}