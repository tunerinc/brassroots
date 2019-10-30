'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {Actions} from 'react-native-router-flux';
import FastImage from 'react-native-fast-image';
import {Text, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import styles from './styles';

// Icons
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {|
  joinSession: () => void,
  openModal: () => void,
  sessionID: string,
  displayName: string,
  profileImage: string,
  name: string,
  artists: string,
  album: string,
  listeners: string | number,
  distance: string | number,
|};

type State = {||};

export default class LiveSessionCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    const {sessionID} = this.props;
    const {sessionID: newID} = nextProps;
    return sessionID !== newID;
  }

  render() {
    const {
      sessionID,
      openModal,
      joinSession,
      displayName,
      profileImage,
      name,
      artists,
      album,
      listeners,
      distance,
    } = this.props;
    
    return (
      <TouchableHighlight
        style={styles.session}
        onPress={joinSession}
        activeOpacity={0.5}
        underlayColor='#1b1b1e'
      >
        <View>
          <View style={styles.header}>
            <Text style={styles.displayName}>
              {displayName}
            </Text>
            <Text style={styles.live}>LIVE</Text>
          </View>
          <View style={styles.info}>
            <FastImage style={styles.image} source={{uri: profileImage}} />
            <View style={styles.track}>
              <Text numberOfLines={1} style={styles.name}>
                {name}
              </Text>
              <Text numberOfLines={1} style={styles.artistAlbum}>
                <Text style={styles.artists}>
                  {artists}
                </Text>
                <Text style={styles.separator}> • </Text>
                <Text style={styles.album}>
                  {album}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.action}>
              <MaterialIcons
                name='group'
                style={styles.actionIcon}
                color='#fefefe'
              />
              <Text style={styles.actionText}>
                {listeners}
              </Text>
            </View>
            <View style={styles.action}>
              <Ionicons
                name='md-pin'
                style={styles.actionIcon}
                color='#888'
              />
              <Text style={[styles.actionText, styles.disabled]}>
                {distance} mi
              </Text>
            </View>
            <TouchableOpacity style={styles.action}>
              {/* <Ionicons
                name='md-share-alt'
                style={styles.actionIcon}
                color='#fefefe'
              />
              <Text style={styles.actionText}>Share</Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton} onPress={openModal} activeOpacity={0.5}>
              {/* <SimpleLineIcons name='options' style={styles.options} /> */}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}