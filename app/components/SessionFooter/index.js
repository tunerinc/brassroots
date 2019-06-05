'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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
  toggleLike: () => any,
  currentUserID: string,
  image: string,
  contextQueue: Array<Track>,
  context: {
    id: string,
    type: string,
    name?: string,
    displayName?: string,
  },
|};

type State = {||};

export default class SessionFooter extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {toggleLike, currentUserID, image, contextQueue, context} = this.props;

    return (
      <View>
        <TouchableOpacity style={styles.addTrackButton} disabled>
          <View style={styles.addTrackIcon}>
            <MaterialCommunityIcons name='plus' color='#fefefe' style={styles.addTrackPlus} />
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
            <View style={styles.upNextHeading}>
              <Text style={styles.upNextHeadingText} numberOfLines={1}>
                <Text>From </Text>
                {context.type === 'user-album' || context.type === 'user-artist' &&
                  <Text>
                    {context.type.split('-').pop()}{' '}
                  </Text>
                }
                {(
                  !context.type.includes('tracks')
                  && !context.type.includes('most')
                  && !context.type.includes('recently')
                  && context.type !== 'conversation'
                ) &&
                  <Text>
                    {context.type}{' '}
                  </Text>
                }
                {(
                  context.type === 'playlist'
                  || context.type.includes('album')
                  || context.type.includes('artist')
                  || context.type.includes('tracks')
                  || context.type === 'conversation'
                ) &&
                  <Text>
                    "{context.name}"
                  </Text>
                }
                {(
                  context.id === currentUserID
                  && context.type !== 'conversation'
                  && context.type !== 'playlist'
                  && !context.type.includes('album')
                  && !context.type.includes('artist')
                  && !context.type.includes('recently')
                  && !context.type.includes('tracks')
                ) &&
                  <Text>
                    <Text>your</Text>
                    <Text>
                      {' '}{context.type.split('-').pop()}{' '}
                    </Text>
                    <Text>played</Text>
                  </Text>
                }
                {(
                  context.id !== currentUserID
                  && context.type !== 'conversation'
                  && context.type !== 'playlist'
                  && !context.type.includes('album')
                  && !context.type.includes('artist')
                  && !context.type.includes('recently')
                  && !context.type.includes('tracks')
                ) &&
                  <Text>
                    <Text>
                      {context.displayName}
                    </Text>
                    <Text>'s </Text>
                    <Text>
                    {' '}{context.type.split('-').pop()}{' '}
                    </Text>
                    <Text> played</Text>
                  </Text>
                }
              </Text>
            </View>
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