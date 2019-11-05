'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux'
import LikeButton from '../LikeButton';
import TrackCard from '../TrackCard';
import styles from './styles';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Track = {|
  id: string,
  name: string,
  artists: string,
|};

type Props = {|
  addTrack: () => any,
  toggleLike: () => any,
  currentUserID: string,
  displayName: string,
  image: string,
  contextQueue: Array<Track>,
  context: {
    +id: string,
    +type: string,
    +name?: string,
    +displayName?: string,
  },
|};

type State = {||};

export default class SessionFooter extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {toggleLike, currentUserID, displayName, image, contextQueue, context, addTrack} = this.props;

    return (
      <View>
        <TouchableOpacity style={styles.addTrackButton} onPress={addTrack}>
          <View style={styles.addTrackIcon}>
            <MaterialCommunityIcons name='plus' style={styles.addTrackPlus} />
          </View>
          <Text style={styles.addTrackText}>Add a track...</Text>
          <LikeButton
            disabled={true}
            liked={false}
            showCount={false}
            toggleLike={toggleLike}
            totalLikes={0}
          />
        </TouchableOpacity>
        {!contextQueue.length !== 0 &&
          <View style={styles.upNext}>
            {/* <View style={styles.upNextHeading}>
              <Text style={styles.upNextHeadingText} numberOfLines={1}>
                <Text>From </Text>
                {(
                  context.displayName === displayName
                  && (
                    context.type === 'user-tracks'
                    || context.type === 'user-album'
                    || context.type === 'user-artist'
                  )
                ) &&
                  <Text>your library</Text>
                }
                {(
                  context.displayName !== currentUserID
                  && (
                    context.type === 'user-tracks'
                    || context.type === 'user-album'
                    || context.type === 'user-artist'
                  )
                ) &&
                  <Text>{context.displayName}'s library</Text>
                }
                {(context.type === 'playlist') &&
                  <Text>
                    "{context.name}"
                  </Text>
                }
              </Text>
            </View> */}
            {
              contextQueue
                .slice(0, 3)
                .map((track, index) => {
                  return (
                    <TrackCard
                      key={track.id}
                      context={{id: track.id, type: 'context'}}
                      image={image}
                      showRoundImage={true}
                      name={track.name}
                      artists={track.artists}
                      type='contextQueue'
                    />
                  );
                })
            }
          </View>
        }
      </View>
    );
  }
}