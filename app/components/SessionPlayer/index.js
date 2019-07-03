'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {|
  togglePause: () => void,
  skipNext: () => void,
  skipPrev: () => void,
  prevTrackID: ?string,
  nextTrackID: ?string,
  isOwner: boolean,
  paused: boolean,
  image: string,
|};

type State = {||};

export default class SessionPlayer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    const {image, paused} = this.props;
    const {image: newImage, paused: newPaused} = nextProps;
    return image !== newImage || paused !== newPaused;
  }

  render() {
    const {
      togglePause,
      skipNext,
      skipPrev,
      prevTrackID,
      nextTrackID,
      isOwner,
      paused,
      image,
    } = this.props;
    const prevExists = isOwner && prevTrackID;
    const prevDisabled = prevExists ? false : true;
    const prevColor = prevExists ? 'rgba(254,254,254,0.9)' : 'rgba(254,254,254,0.2)';
    const nextExists = isOwner && nextTrackID;
    const nextDisabled = nextExists ? false : true;
    const nextColor = nextExists ? 'rgba(254,254,254,0.9)' : 'rgba(254,254,254,0.2)';

    return (
      <View style={styles.player}>
        <TouchableOpacity style={styles.left} onPress={skipPrev} disabled={prevDisabled}>
          <Entypo name='controller-jump-to-start' style={styles.leftIcon} color={prevColor} />
        </TouchableOpacity>
        <View style={styles.center}>
          <Image
            style={styles.image}
            resizeMode='cover'
            resizeMethod='scale'
            source={{uri: image}}
          />
          <TouchableOpacity style={styles.playPause} onPress={togglePause}>
            {!paused &&
              <FontAwesome
                name='pause'
                size={75}
                color='rgba(254,254,254,0.9)'
                style={styles.centerIcon}
              />
            }
            {paused &&
              <Entypo
                name='controller-play'
                size={125}
                color='rgba(254,254,254,0.9)'
                style={styles.centerIcon}
              />
            }
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.right} onPress={skipNext} disabled={nextDisabled}>
          <Entypo name='controller-next' style={styles.rightIcon} color={nextColor} />
        </TouchableOpacity>
      </View>
    );
  }
}