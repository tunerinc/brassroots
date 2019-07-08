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
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    const {getArtists, artists: {userArtists, fetchingArtists}} = this.props;
    if (!userArtists.length && !fetchingArtists) getArtists();
  }

  navToArtist = artistID => () => {
    Actions.librarySingleArtist({artistToView: artistID});
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

  renderArtist({item}) {
    const {artists: {artistsByID}} = this.props;
    const {medium, name, userTracks} = artistsByID[item];

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
    const {artists: {fetchingArtists}} = this.props;

    if (!fetchingArtists) return null;

    return <LoadingArtist />;
  }

  handleRefresh() {
    const {getArtists} = this.props;
    getArtists();
  }

  render() {
    const {shadowOpacity} = this.state;
    const {
      artists: {userArtists, fetchingArtists, refreshingArtists, error: artistError},
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={Actions.pop}
            />
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
            refreshing={refreshingArtists}
            onRefresh={this.handleRefresh}
          />
        }
        {(userArtists.length === 0 || !userArtists.length) &&
          <View style={styles.scrollContainer}>
            <View style={styles.scrollWrap}>
              {fetchingArtists &&
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
              {(!fetchingArtists && !artistError) && <Text>Nothing to show</Text>}
              {(!fetchingArtists && artistError) && <Text>There was an error.</Text>}
            </View>
          </View>
        }
      </View>
    );
  }
}

LibraryArtistsView.propTypes = {
  artists: PropTypes.object.isRequired,
  getArtists: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
}

function mapStateToProps({artists, users}) {
  return {
    artists,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getArtists,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryArtistsView);