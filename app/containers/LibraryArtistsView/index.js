'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ActivityIndicator, Animated, Easing, VirtualizedList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ArtistCard from '../../components/ArtistCard';
import LoadingArtist from '../../components/LoadingArtist';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

class LibraryArtistsView extends React.Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
    this.renderArtist = this.renderArtist.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);

    this.shadowOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    
  }

  navToArtist = artistID => () => {
    Actions.librarySingleArtist({artistToView: artistID});
  }

  onScroll({nativeEvent: {contentOffset: {y}}}) {
    if ((y > 0 && this.shadowOpacity === 0) || (y <= 0 && this.shadowOpacity === 0.9)) {
      Animated.timing(
        this.shadowOpacity,
        {
          toValue: y > 0 ? 0.9 : 0,
          duration: 230,
          easing: Easing.linear,
        }
      ).start();
    }
  }

  renderArtist({item}) {
    const {artists: {artistsByID}} = this.props;
    const {image, name, userTracks} = artistsByID[artistID];

    return (
      <ArtistCard
        key={item}
        artistImage={image || ''}
        artistName={name}
        navToArtist={this.navToArtist(item)}
        userTrackLength={userTracks.length}
      />
    );
  }

  renderFooter() {
    const {artists: {fetchingArtists}} = this.props;

    if (!fetchingArtists) return null;

    return (
      <View style={{paddingTop: 20, paddingBottom: 40}}>
        <ActivityIndicator size='small' animating={true} color='#888' />
      </View>
    );
  }

  handleRefresh() {

  }

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.shadowOpacity};
    const {
      artists: {userArtists, fetchingArtists, refreshingArtists, error: artistError},
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[ styles.shadow, animatedHeaderStyle ]}>
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
        {userArtists.length === 0 || !userArtists.length &&
          <View style={styles.scrollContainer}>
            <View style={styles.scrollWrap}>
              {fetchingArtists &&
                <View>
                  <LoadingArtist />
                  <LoadingArtist />
                  <LoadingArtist />
                  <LoadingArtist />
                  <LoadingArtist />
                </View>
              }
              {!fetchingArtists && !artistError && <Text>Nothing to show</Text>}
              {!fetchingArtists && artistError && <Text>There was an error.</Text>}
            </View>
          </View>
        }
      </View>
    );
  }
}

LibraryArtistsView.propTypes = {
  artists: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
}

function mapStateToProps({artists, users}) {
  return {
    artists,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryArtistsView);