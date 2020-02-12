'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import styles from './styles';
import {type Context} from '../../reducers/queue';

//Components
import DeleteQueueTrackButton from '../DeleteQueueTrackButton';
import LikeButton from '../LikeButton';

// Icons
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type Props = {|
  albumName?: string,
  artists?: string,
  context: Context,
  deleteTrack?: () => void,
  deleting?: boolean,
  liking?: boolean,
  editing?: boolean,
  image?: string,
  liked?: boolean,
  name: string,
  onPress?: () => void,
  openModal?: () => void,
  queueError?: boolean,
  showFavoriteIcon?: boolean,
  showOptions?: boolean,
  showRoundImage?: boolean,
  showSquareImage?: boolean,
  toggleLike?: () => void,
  totalLikes?: number,
  trackCount?: number,
  trackIndex?: number,
  trackNumber?: number,
  type: string,
  displayName?: string,
|};

type State = {||};

export default class TrackCard extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      albumName,
      artists,
      deleteTrack,
      deleting,
      editing,
      image,
      liking,
      liked,
      name,
      onPress,
      openModal,
      queueError,
      showFavoriteIcon,
      showOptions,
      showRoundImage,
      showSquareImage,
      toggleLike,
      totalLikes,
      trackCount,
      trackIndex,
      trackNumber,
      type,
      displayName,
    } = this.props;
    const editingFavorite: boolean = typeof editing === 'boolean' && type === 'favorite' && editing;
    const inQueue: boolean = type === 'userQueue' || type === 'contextQueue';
    const showTopArtists: boolean = (inQueue || type === 'playlist') && typeof artists === 'string';
    const showUser: boolean = (inQueue || type === 'playlist') && typeof displayName === 'string';
    const showArtistAlbum: boolean = type !== 'playlist' && !inQueue && typeof artists === 'string';

    return (
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor='#1b1b1e'
        onPress={onPress}
        disabled={inQueue || editingFavorite}
        style={[
          styles.track,
          {opacity: type === 'contextQueue' ? 0.5 : 1},
        ]}
      >
        <View style={styles.wrap}>
          {(showSquareImage && typeof image === 'string') &&
            <View>
              <FastImage style={styles.image} source={{uri: image}} />
              {/* {editingFavorite &&
                <TouchableOpacity style={styles.imageFilter} disabled>
                  <MaterialIcons name='edit' style={styles.editIcon} />
                </TouchableOpacity>
              } */}
            </View>
          }
          {(showRoundImage && typeof image === 'string') &&
            <FastImage style={[styles.image, styles.round]} source={{uri: image}} />
          }
          {typeof trackIndex === 'number' &&
            <View style={styles.position}>
              <Text style={styles.positionText}>
                {trackIndex + 1}
              </Text>
            </View>
          }
          {typeof trackNumber === 'number' &&
            <View style={styles.position}>
              <Text style={styles.positionText}>
                {trackNumber}
              </Text>
            </View>
          }
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              <Text style={styles.name}>{name}</Text>
              {showTopArtists &&
                <Text numberOfLines={1}>
                  <Text style={styles.name}> • </Text>
                  <Text style={[styles.name, styles.gray]}>
                    {artists}
                  </Text>
                </Text>
              }
            </Text>
            {showUser &&
              <Text numberOfLines={1} style={styles.user}>
                {displayName}
              </Text>
            }
            {showArtistAlbum &&
              <Text numberOfLines={1} style={styles.bottom}>
                <Text style={styles.bottomText}>
                  {artists}
                </Text>
                {(albumName && type !== 'albumTrack') &&
                  <Text>
                    <Text style={styles.bottomText}> • </Text>
                    <Text style={styles.bottomText}>
                      {albumName}
                    </Text>
                  </Text>
                }
              </Text>
            }
          </View>
          {(type === 'userQueue' && editing) &&
            <DeleteQueueTrackButton
              deleteTrack={deleteTrack}
              deleting={deleting || false}
              disabled={deleting || queueError !== null || false}
              error={queueError || null}
            />
          }
          {(inQueue && !editing && toggleLike && typeof liking === 'boolean') &&
            <LikeButton
              disabled={type === 'contextQueue' || liking}
              liked={type === 'userQueue' && typeof liked === 'boolean' && liked}
              showCount={inQueue && type !== 'contextQueue'}
              toggleLike={toggleLike}
              totalLikes={totalLikes || 0}
            />
          }
          {typeof trackCount === 'string' &&
            <View style={styles.count}>
              <Foundation name='play' color='#fefefe' style={styles.play} />
              <Text numberOfLines={1} style={styles.number}>
                {trackCount}
              </Text>
            </View>
          }
          {showFavoriteIcon && <Foundation name='star' size={25} style={styles.favoriteTrackIcon} />}
          {(showOptions && openModal) &&
            <TouchableOpacity style={styles.optionsButton} onPress={openModal} activeOpacity={0.5}>
              <SimpleLineIcons name='options' style={styles.options} />
            </TouchableOpacity>
          }
        </View>
      </TouchableHighlight>
    );
  }
}
