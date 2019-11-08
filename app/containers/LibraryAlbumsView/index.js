"use strict";

import React from "react";
import PropTypes from "prop-types";
import FastImage from 'react-native-fast-image';
import {Text, View, ActivityIndicator, VirtualizedList} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {onScroll} from 'react-native-redash';
import Animated from 'react-native-reanimated';
import debounce from "lodash.debounce";
import moment from 'moment';

// Styles
import styles from "./styles";

// Components
import AlbumCard from "../../components/AlbumCard";
import LoadingAlbum from "../../components/LoadingAlbum";

// Icons
import Ionicons from "react-native-vector-icons/Ionicons";

// Albums Action Creators
import {getAlbums} from "../../actions/albums/GetAlbums";

const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);
const {Value, interpolate, Extrapolate} = Animated;

class LibraryAlbumsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      y: new Value(0),
    };

    this.renderAlbum = this.renderAlbum.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);

    this._onEndReached = debounce(this.onEndReached, 0);
  }

  componentDidMount() {
    const {getAlbums, albums: {userAlbums, lastUpdated}} = this.props;
    const last = moment(lastUpdated, 'ddd, MMM D, YYYY, h:mm:ss a');
    const timeDiff = moment().diff(last, 'minutes', true);

    if (!userAlbums.length || timeDiff >= 1) {
      setTimeout(() => getAlbums(true, 0), 100);
    }
  }

  onEndReached() {
    const {getAlbums, albums: {fetching, userAlbums, totalUserAlbums}} = this.props;

    if (!fetching.includes('albums') && userAlbums.length && userAlbums.length !== totalUserAlbums) {
      getAlbums(false, userAlbums.length);
    }
  }

  handleRefresh() {
    const {getAlbums, albums: {refreshing}} = this.props;
    if (refreshing) return;
    getAlbums(true, 0);
  }

  navToAlbum = albumID => () => Actions.libSingleAlbum({albumToView: albumID});

  renderAlbum({item}) {
    const {entities: {albums}} = this.props;
    const {medium, name, artists} = albums.byID[item];

    return (
      <AlbumCard
        key={item}
        albumImage={medium || ''}
        albumName={name}
        artists={artists.map(artist => artist.name).join(', ')}
        navToAlbum={this.navToAlbum(item)}
      />
    );
  }

  renderFooter() {
    const {albums: {fetching, refreshing, userAlbums, totalUserAlbums}} = this.props;

    if (
      !fetching.includes('albums')
      || refreshing
      || !userAlbums.length
      || userAlbums.length === totalUserAlbums
    ) return <View></View>;

    return (
      <View style={styles.footer}>
        <FastImage style={styles.loadingGif} source={require('../../images/loading.gif')} />
      </View>
    );
  }

  render() {
    const {y} = this.state;
    const {albums: {userAlbums, fetching, refreshing, error: albumError}} = this.props;
    const shadowOpacity = interpolate(y, {
      inputRange: [0, 20],
      outputRange: [0, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name="ios-arrow-back" style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Albums</Text>
            <View style={styles.rightIcon} />
          </View>
        </Animated.View>
        {userAlbums.length !== 0 &&
          <AnimatedVirtualizedList
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
            onScroll={onScroll({y})}
            scrollEventThrottle={1}
            ListEmptyComponent={<Text>Nothing to show</Text>}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
          />
        }
        {(userAlbums.length === 0 || !userAlbums.length) &&
          <View style={styles.albumsWrap}>
            {(!fetching.includes('albums') && albumError) && <Text>There was an error.</Text>}
            {fetching.includes('albums' || (!fetching.includes('albums') && !albumError))  &&
              <View>
                <LoadingAlbum />
                <LoadingAlbum />
                <LoadingAlbum />
                <LoadingAlbum />
                <LoadingAlbum />
                <LoadingAlbum />
                <LoadingAlbum />
                <LoadingAlbum />
                <LoadingAlbum />
                <LoadingAlbum />
                <LoadingAlbum />
              </View>
            }
          </View>
        }
      </View>
    );
  }
}

LibraryAlbumsView.propTypes = {
  albums: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  getAlbums: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({albums, entities, users}) {
  return {
    albums,
    entities,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getAlbums},  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryAlbumsView);