'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';
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
  context: Context,
  deleting?: boolean,
  editing?: boolean,
  image?: string,
  liked?: boolean,
  name: string,
  openModal?: () => void,
  queueError?: boolean,
  showFavoriteIcon?: boolean,
  showOptions?: boolean,
  showRoundImage?: boolean,
  showSquareImage?: boolean,
  totalLikes?: number,
  artists?: string,
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
      deleting,
      editing,
      image,
      liked,
      name,
      openModal,
      queueError,
      showFavoriteIcon,
      showOptions,
      showRoundImage,
      showSquareImage,
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
        onPress={() => console.log('track pressed')}
        disabled={inQueue || editingFavorite}
        style={[
          styles.track,
          {opacity: type === 'contextQueue' ? 0.5 : 1},
        ]}
      >
        <View style={styles.wrap}>
          {(showSquareImage && image) &&
            <View>
              <Image style={styles.image} source={{uri: image}} />
              {editingFavorite &&
                <View style={styles.imageFilter}>
                  <MaterialIcons name='edit' style={styles.editIcon} />
                </View>
              }
            </View>
          }
          {(showRoundImage && image) &&
            <Image style={[styles.image, styles.round]} source={{uri: image}} />
          }
          {trackIndex &&
            <View style={styles.position}>
              <Text style={styles.positionText}>
                {trackIndex + 1}
              </Text>
            </View>
          }
          {trackNumber &&
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
                  <Text style={styles.separator}> • </Text>
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
                <Text style={styles.artists}>
                  {artists}
                </Text>
                {(albumName && type !== 'albumTrack') &&
                  <Text>
                    <Text style={styles.separator}> • </Text>
                    <Text style={styles.album}>
                      {albumName}
                    </Text>
                  </Text>
                }
              </Text>
            }
          </View>
          {(type === 'userQueue' && editing) &&
            <DeleteQueueTrackButton
              deleteTrack={() => console.log('delete track pressed')}
              deleting={deleting || false}
              disabled={deleting || queueError || false}
              error={queueError || null}
            />
          }
          {(inQueue && !editing) &&
            <LikeButton
              disabled={type === 'contextQueue'}
              liked={type === 'userQueue' && typeof liked === 'boolean' && liked}
              showCount={inQueue && type !== 'contextQueue'}
              toggleLike={() => console.log('toggle like pressed')}
              totalLikes={totalLikes || 0}
            />
          }
          {trackCount &&
            <View style={styles.count}>
              <Foundation name='play' color='#fefefe' style={styles.play} />
              <Text numberOfLines={1} style={styles.number}>
                {trackCount}
              </Text>
            </View>
          }
          {showFavoriteIcon && <Foundation name='star' size={25} style={styles.favoriteTrackIcon} />}
          {showOptions &&
            <SimpleLineIcons
              name='options'
              style={styles.options}
              color='#fefefe'
              onPress={openModal}
            />
          }
        </View>
      </TouchableHighlight>
    );
  }
}
