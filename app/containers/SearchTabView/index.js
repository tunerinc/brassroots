'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import LoadingUser from '../../components/LoadingUser';
import LoadingTrack from '../../components/LoadingTrack';
import LoadingPlaylist from '../../components/LoadingPlaylist';
import LoadingSearch from '../../components/LoadingSearch';
import LoadingArtist from '../../components/LoadingArtist';
import LoadingAlbum from '../../components/LoadingAlbum';
import Search from 'react-native-search-box';
import styles from './styles';

class SearchTabView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollEnabled: true,
      tempQuery: '',
      shadowOpacity: new Animated.Value(0),
      filterIndex: new Animated.Value(-2),
      filterOpacity: new Animated.Value(0)
    };

    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnCancel = this.handleOnCancel.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  handleOnFocus() {
    const {filterIndex, filterOpacity} = this.state;

    return new Promise((resolve, reject) => {
      try {
        this.setState(
          {scrollEnabled: false},
          () => {
            Animated.sequence([
              Animated.timing(filterIndex, {
                toValue: 2,
                duration: 1,
                easing: Easing.linear
              }),
              Animated.timing(filterOpacity, {
                toValue: 0.9,
                duration: 230,
                easing: Easing.linear
              })
            ]).start();
      
            resolve();
          },
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  handleAfterFocus() {
    return new Promise(resolve => resolve());
  }

  handleOnCancel() {
    const {filterIndex, filterOpacity} = this.state;

    return new Promise((resolve, reject) => {
      try {
        this.setState(
          {scrollEnabled: true},
          () => {
            Animated.sequence([
              Animated.timing(filterOpacity, {
                toValue: 0,
                duration: 230,
                easing: Easing.linear
              }),
              Animated.timing(filterIndex, {
                toValue: -2,
                duration: 1,
                easing: Easing.linear
              })
            ]).start();
      
            resolve();
          },
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  handleOnChangeText() {
    return new Promise(resolve => resolve());
  }

  onScroll({nativeEvent: {contentOffset: {y}}}) {
    const {shadowOpacity} = this.state;

    if (y > 0) {
      if (shadowOpacity != 0.9) {
        Animated.timing(shadowOpacity, {
          toValue: 0.9,
          duration: 75,
          easing: Easing.linear,
        }).start();
      };
    } else {
      Animated.timing(shadowOpacity, {
        toValue: 0,
        duration: 75,
        easing: Easing.linear,
      }).start()
    }
  }

  goToResults = type => () => {
    switch (type) {
      case 'recent':
        Actions.searchRecent();
        return;
      case 'user':
        Actions.searchUsers();
        return;
      case 'track':
        Actions.searchTracks();
        return;
      case 'playlist':
        Actions.searchPlaylists();
        return;
      case 'artist':
        Actions.searchArtists();
        return;
      case 'album':
        Actions.searchAlbums();
        return;
      default:
        return;
    }
  }

  render() {
    const {scrollEnabled, shadowOpacity, filterIndex, filterOpacity} = this.state;
    const {
      search: {
        recentSearches,
        nearbySearches,
        trendingSearches,
        userResults,
        trackResults,
        playlistResults,
        albumResults,
        artistResults,
        groupResults,
        query,
        fetching,
        searching,
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <Search
            ref='search_box'
            onFocus={this.handleOnFocus}
            afterFocus= {this.handleAfterFocus}
            onCancel={this.handleOnCancel}
            onChangeText={this.handleOnChangeText}
            backgroundColor='#1b1b1e'
            placeholderTextColor='#888'
            titleCancelColor='#fefefe'
            autoCapitalize='none'
            cancelTitle='cancel'
            cancelButtonStyle={styles.cancelSearchButton}
            cancelButtonTextStyle={styles.cancelSearchButtonText}
            inputStyle={styles.searchInput}
            placeholder='Search'
            returnKeyType='search'
            placeholderCollapsedMargin={10}
            placeholderExpandedMargin={25}
          />
        </Animated.View>
        <ScrollView
          style={styles.searchWrap}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
          scrollEnabled={scrollEnabled}
        >
          <Animated.View
            style={[
              styles.activeSearchFilter,
              {opacity: filterOpacity, zIndex: filterIndex},
            ]}
          ></Animated.View>
          {!searching &&
            <View>
              {(
                query !== ''
                && (
                  userResults.length !== 0
                  || trackResults.length !== 0
                  || groupResults.length !== 0
                  || playlistResults.length !== 0
                  || albumResults.length !== 0
                  || artistResults.length !== 0
                )
              ) ? (
                <Text>We have stuff</Text>
              ) : (
                <View>
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Recent</Text>
                      {recentSearches.length !== 0 &&
                        <TouchableOpacity
                          style={styles.viewAllButton}
                          onPress={this.goToResults('recent')}
                        >
                          <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                        </TouchableOpacity>
                      }
                      {recentSearches.length === 0 &&
                        <TouchableOpacity style={styles.viewAllButton} disabled={true}>
                          <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                        </TouchableOpacity>
                      }
                    </View>
                    {!fetching.includes('recent') && recentSearches.length !== 0 &&
                      <Text>We have other stuff</Text>
                    }
                    {fetching.includes('recent') && recentSearches.length === 0 &&
                      <View>
                        <LoadingSearch />
                        <LoadingSearch />
                        <LoadingSearch />
                      </View>
                    }
                  </View>
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Trending</Text>
                    </View>
                    {!fetching.includes('trending') && trendingSearches.length !== 0 &&
                      <Text>We have other stuff</Text>
                    }
                    {fetching.includes('trending') && trendingSearches.length === 0 &&
                      <View>
                        <LoadingSearch />
                        <LoadingSearch />
                        <LoadingSearch />
                      </View>
                    }
                  </View>
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Nearby</Text>
                    </View>
                    {!fetching.includes('nearby') && nearbySearches.length !== 0 &&
                      <Text>We have other stuff</Text>
                    }
                    {fetching.includes('nearby') && nearbySearches.length === 0 &&
                      <View>
                        <LoadingSearch />
                        <LoadingSearch />
                        <LoadingSearch />
                      </View>
                    }
                  </View>
                </View>
              )}
            </View>
          }
          {searching &&
            <View>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Users</Text>
                  {userResults.length === 0 &&
                    <TouchableOpacity
                      style={styles.viewAllButton}
                      onPress={this.goToResults('user')}
                    >
                      <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                    </TouchableOpacity>
                  }
                  {userResults.length !== 0 &&
                    <TouchableOpacity style={styles.viewAllButton} disabled={true}>
                      <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                    </TouchableOpacity>
                  }
                </View>
                <LoadingUser />
              </View>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Tracks</Text>
                  {trackResults.length === 0 &&
                    <TouchableOpacity
                      style={styles.viewAllButton}
                      onPress={this.goToResults('track')}
                    >
                      <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                    </TouchableOpacity>
                  }
                  {trackResults.length !== 0 &&
                    <TouchableOpacity style={styles.viewAllButton} disabled={true}>
                      <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                    </TouchableOpacity>
                  }
                </View>
                <LoadingTrack type='cover' />
              </View>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Playlists</Text>
                  {playlistResults.length === 0 &&
                    <TouchableOpacity
                      style={styles.viewAllButton}
                      onPress={this.goToResults('playlist')}
                    >
                      <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                    </TouchableOpacity>
                  }
                  {playlistResults.length !== 0 &&
                    <TouchableOpacity style={styles.viewAllButton} disabled={true}>
                      <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                    </TouchableOpacity>
                  }
                </View>
                <LoadingPlaylist />
              </View>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Artists</Text>
                  {artistResults.length === 0 &&
                    <TouchableOpacity
                      style={styles.viewAllButton}
                      onPress={this.goToResults('artist')}
                    >
                      <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                    </TouchableOpacity>
                  }
                  {artistResults.length !== 0 &&
                    <TouchableOpacity style={styles.viewAllButton} disabled={true}>
                      <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                    </TouchableOpacity>
                  }
                </View>
                <LoadingArtist />
              </View>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Albums</Text>
                  {albumResults.length === 0 &&
                    <TouchableOpacity
                      style={styles.viewAllButton}
                      onPress={this.goToResults('album')}
                    >
                      <Text style={[styles.viewAllText, styles.enabledText]}>VIEW ALL</Text>
                    </TouchableOpacity>
                  }
                  {albumResults.length !== 0 &&
                    <TouchableOpacity style={styles.viewAllButton} disabled={true}>
                      <Text style={[styles.viewAllText, styles.disabledText]}>VIEW ALL</Text>
                    </TouchableOpacity>
                  }
                </View>
                <LoadingAlbum />
              </View>
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

SearchTabView.propTypes = {
  search: PropTypes.object.isRequired,
};

function mapStateToProps({search}) {
  return {search};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTabView);