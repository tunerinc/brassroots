'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import LoadingTrack from '../LoadingTrack';
import LoadingPlaylist from '../LoadingPlaylist';
import styles from './styles';

type Props = {|
  renderItem: () => any,
  viewMore: () => any,
  type: string,
  title: string,
  items: Array<string>,
  showError: boolean,
  fetching: boolean,
|};

type State = {||};

export default class MusicSection extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {renderItem, type, viewMore, title, items, showError, fetching} = this.props;
    const disabled: boolean = items.length <= 3;
    const textStyles = [styles.text, ...(disabled ? [styles.disabled] : [])];
    const isSongType: boolean = type === 'recent' || type === 'most';

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {title}
          </Text>
          <TouchableOpacity style={styles.button} onPress={viewMore} disabled={disabled}>
            <Text style={textStyles}>view all</Text>
          </TouchableOpacity>
        </View>
        {items.length !== 0 &&
          <FlatList
            data={items.slice(0, 3)}
            renderItem={renderItem}
            keyExtractor={(item: string) => item}
          />
        }
        {(!items.length || items.length === 0) &&
          <View>
            {(fetching && !showError && isSongType) && <LoadingTrack type='cover' />}
            {(fetching && !showError && !isSongType) && <LoadingPlaylist />}
            {(!fetching && showError) && <Text style={styles.nothing}>Something went wrong</Text>}
            {(!fetching && !showError) &&
              <View style={styles.empty}>
                {isSongType && <Text style={styles.emptyTitle}>No songs played</Text>}
                {!isSongType && <Text style={styles.emptyTitle}>No playlists played</Text>}
                {type === 'recent' &&
                  <Text style={styles.emptyText}>Recently Played is your listening history</Text>
                }
                {type === 'most' &&
                  <Text style={styles.emptyText}>Most Played are the songs you listen to most</Text>
                }
                {type === 'top' &&
                  <Text style={styles.emptyText}>Top Playlists are your most played playlists</Text>
                }
              </View>
            }
          </View>
        }
      </View>
    );
  }
}