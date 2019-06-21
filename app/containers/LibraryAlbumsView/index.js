"use strict";

import React from "react";
import PropTypes from "prop-types";
import {Text, View, ActivityIndicator, Animated, Easing, VirtualizedList} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import debounce from "lodash.debounce";

// Styles
import styles from "./styles";

// Components
import AlbumCard from "../../components/AlbumCard";
import LoadingAlbum from "../../components/LoadingAlbum";

// Icons
import Ionicons from "react-native-vector-icons/Ionicons";

// Albums Action Creators
import {getAlbums} from "../../actions/albums/GetAlbums";

class LibraryAlbumsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shadowOpacity: new Animated.Value(0),
    };

    this.onScroll = this.onScroll.bind(this);
    this.renderAlbum = this.renderAlbum.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);

    this._onEndReached = debounce(this.onEndReached, 1000);
  }

  componentDidMount() {
    const {getAlbums, albums: {userAlbums}} = this.props;

    if (!userAlbums.length) {
      getAlbums(true, 0);
    }
  }

  onEndReached() {
    const {getAlbums, albums: {fetchingAlbums, userAlbums}} = this.props;

    if (fetchingAlbums || !userAlbums.length) return;

    getAlbums(false, userAlbums.length);
  }

  handleRefresh() {
    const {getAlbums, albums: {refreshingAlbums}} = this.props;

    if (refreshingAlbums) return;

    getAlbums(true, 0);
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

  navToAlbum = albumID => () => {
    Actions.librarySingleAlbum({albumToView: albumID});
  }

  renderAlbum({item}) {
    const {albums: {albumsByID}} = this.props;
    const {small, name, artists} = albumsByID[item];

    return (
      <AlbumCard
        key={item}
        albumImage={small || ''}
        albumName={name}
        artists={artists.map(artist => artist.name).join(', ')}
        navToAlbum={this.navToAlbum(item)}
      />
    );
  }

  renderFooter() {
    const {albums: {fetchingAlbums, refreshingAlbums}} = this.props;

    if (!fetchingAlbums || refreshingAlbums) return <View></View>;

    return <LoadingAlbum />;
  }

  render() {
    const {shadowOpacity} = this.state;
    const {albums: {userAlbums, fetchingAlbums, refreshingAlbums, error: albumError}} = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons
              name="ios-arrow-back"
              color="#fefefe"
              style={styles.leftIcon}
              onPress={Actions.pop}
            />
            <Text style={styles.title}>Albums</Text>
            <View style={styles.rightIcon} />
          </View>
        </Animated.View>
        {userAlbums.length !== 0 &&
          <VirtualizedList
            data={userAlbums}
            extraData={this.props}
            style={styles.scrollContainer}
            renderItem={this.renderAlbum}
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
            refreshing={refreshingAlbums}
            onRefresh={this.handleRefresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.7}
          />
        }
        {(userAlbums.length === 0 || !userAlbums.length) &&
          <View style={styles.scrollContainer}>
            <View style={styles.scrollWrap}>
              {fetchingAlbums &&
                <View>
                  <LoadingAlbum />
                  <LoadingAlbum />
                  <LoadingAlbum />
                  <LoadingAlbum />
                  <LoadingAlbum />
                  <LoadingAlbum />
                  <LoadingAlbum />
                </View>
              }
              {(!fetchingAlbums && !albumError) && <Text>Nothing to show</Text>}
              {(!fetchingAlbums && albumError) && <Text>There was an error.</Text>}
            </View>
          </View>
        }
      </View>
    );
  }
}

LibraryAlbumsView.propTypes = {
  albums: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  getAlbums: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({albums, artists, users}) {
  return {
    albums,
    artists,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAlbums,
  },  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryAlbumsView);