'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ActivityIndicator, Animated, Easing, VirtualizedList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Components
import ArtistCard from '../../components/ArtistCard';
import LoadingArtist from '../../components/LoadingArtist';

// Artists Action Creators
import {getArtists} from '../../actions/artists/GetArtists';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

class LibraryArtistsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shadowOpacity: new Animated.Value(0),
    };

    this.onScroll = this.onScroll.bind(this);
    this.renderArtist = this.renderArtist.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentDidMount() {
    const {getArtists, artists: {userArtists, fetching}} = this.props;
    if (!userArtists.length && !fetching.includes('artists')) getArtists();
  }

  navToArtist = artistID => () => Actions.librarySingleArtist({artistToView: artistID});

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

  renderArtist({item}) {
    const {entities: {artists}} = this.props;
    const {medium, name, userTracks} = artists.byID[item];

    return (
      <ArtistCard
        key={item}
        artistImage={medium || ''}
        artistName={name}
        navToArtist={this.navToArtist(item)}
        userTrackLength={userTracks.length}
      />
    );
  }

  renderFooter() {
    const {artists: {fetching}} = this.props;
    if (fetching.includes('artists')) return <LoadingArtist />;
  }

  render() {
    const {shadowOpacity} = this.state;
    const {
      getArtists,
      artists: {userArtists, fetching, refreshingArtists, error: artistError},
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Artists</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        {userArtists.length !== 0 &&
          <VirtualizedList
            data={userArtists}
            extraData={this.props}
            style={styles.scrollContainer}
            renderItem={this.renderArtist}
            keyExtractor={item => item}
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
            ListHeaderComponent={<View />}
            ListFooterComponent={this.renderFooter}
            removeClippedSubviews={false}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>Nothing to show</Text>}
            refreshing={refreshing}
            onRefresh={getArtists}
          />
        }
        {(userArtists.length === 0 || !userArtists.length) &&
          <View style={styles.scrollContainer}>
            <View style={styles.scrollWrap}>
              {(!fetching.includes('artists') && !artistError) && <Text>Nothing to show</Text>}
              {(!fetching.includes('artists') && artistError) && <Text>There was an error.</Text>}
              {fetching.includes('artists') &&
                <View>
                  <LoadingArtist />
                  <LoadingArtist />
                  <LoadingArtist />
                  <LoadingArtist />
                  <LoadingArtist />
                  <LoadingArtist />
                  <LoadingArtist />
                </View>
              }
            </View>
          </View>
        }
      </View>
    );
  }
}

LibraryArtistsView.propTypes = {
  artists: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  getArtists: PropTypes.func.isRequired,
}

function mapStateToProps({artists, entities}) {
  return {
    artists,
    entities,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getArtists}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryArtistsView);