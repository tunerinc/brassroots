'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  VirtualizedList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import debounce from "lodash.debounce";
import Modal from 'react-native-modal';
import LoadingSession from '../../components/LoadingSession';
import SessionFilterModal from '../../components/SessionFilterModal';
import LiveSessionCard from '../../components/LiveSessionCard';
import SessionModal from '../../components/SessionModal';
import styles from './styles';

// Sessions Action Creators
import {getFollowingSessions} from '../../actions/sessions/GetFollowingSessions';
import {getNearbySessions} from '../../actions/sessions/GetNearbySessions';
import {getTrendingSessions} from '../../actions/sessions/GetTrendingSessions';
import {joinSession} from '../../actions/sessions/JoinSession';
import {paginateFollowingSessions} from '../../actions/sessions/PaginateFollowingSessions';
import {paginateNearbySessions} from '../../actions/sessions/PaginateNearbySessions';
import {paginateTrendingSessions} from '../../actions/sessions/PaginateTrendingSessions';

class ExploreTabView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSession: null,
      sessionModalOpen: false,
      shadowOpacity: new Animated.Value(0),
    };

    this.onScroll = this.onScroll.bind(this);
    this.renderSessionModal = this.renderSessionModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.renderSession = this.renderSession.bind(this);
    this.paginate = this.paginate.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.refresh = this.refresh.bind(this);

    this.animatedHeight = new Animated.Value(0);
    this.animatedOpacity = new Animated.Value(0);
    this.animatedIndex = new Animated.Value(-5);
    this.animatedFilterOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    const {
      getTrendingSessions,
      sessions: {explore: {trendingLastUpdated, trendingSessions}},
    } = this.props;
    const lastUpdated = moment(trendingLastUpdated, 'ddd, MMM D, YYYY, h:mm:ss a');
    const timeDiff = moment().diff(lastUpdated, 'minutes', true);

    if (timeDiff >= 1 || trendingSessions.length === 0) {
      getTrendingSessions();
    }
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

  openModal = selectedSession => () => {
    this.setState({selectedSession, sessionModalOpen: true});
  }

  closeModal() {
    this.setState({sessionModalOpen: false});
  }

  renderSessionModal() {
    const {selectedSession} = this.state;
    const {
      sessions: {sessionsByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {following} = usersByID[currentUserID];
    const sessionExists = typeof sessionsByID[selectedSession] === 'object';

    if (!sessionExists) return <View></View>;

    const sessionOwner = usersByID[sessionsByID[selectedSession].ownerID] || null;

    return (
      <SessionModal
        closeModal={this.closeModal}
        isFollowing={following.includes(sessionOwner.id)}
        profileImage={sessionOwner.profileImage}
        displayName={sessionOwner.displayName}
      />
    );
  }

  joinSession = sessionID => () => {
    const {
      joinSession,
      albums: {albumsByID},
      player: {currentTrackID},
      queue: {unsubscribe: queueUnsubscribe},
      sessions: {currentSessionID, sessionsByID, infoUnsubscribe},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const inSession = typeof currentSessionID === 'string';
    const track = inSession ? tracksByID[currentTrackID] : null;
    const album = inSession ? albumsByID[track.albumID] : null;
    const owner = inSession ? usersByID[sessionsByID[currentSessionID].ownerID] : null;
    const user = usersByID[currentUserID];
    const session = {
      queueUnsubscribe,
      infoUnsubscribe,
      chatUnsubscribe: inSession ? () => console.log('chat unsub') : null,
      id: sessionID,
      owner: inSession ? {id: owner.id, name: owner.displayName, image: owner.profileImage} : null,
      current: inSession ? currentSessionID : null,
      total: inSession ? sessionsByID[currentSessionID].totalListeners : null,
      track: inSession
        ? {
          id: track.id,
          name: track.name,
          trackNumber: track.trackNumber,
          durationMS: track.durationMS,
          artists: track.artists,
          album: {
            id: album.id,
            name: album.name,
            small: album.small,
            medium: album.medium,
            large: album.large,
            artists: album.artists,
          },
        }
        : null,
    };

    joinSession(
      session,
      {id: user.id, displayName: user.displayName, profileImage: user.profileImage},
      inSession,
    );
  }

  renderSession({item}) {
    const {
      albums: {albumsByID},
      sessions: {sessionsByID},
      tracks: {tracksByID},
      users: {usersByID},
    } = this.props;
    const session = sessionsByID[item];

    if (!session) return <View></View>;

    const track = tracksByID[session.currentTrackID];
    const album = albumsByID[track.albumID];
    const owner = usersByID[session.ownerID];

    let listenerTotal = 0;
    let formattedDistance = '';

    if (session.totalListeners < 1000) {
      listenerTotal = session.totalListeners;
    } else if (session.totalListeners < 1000000) {
      const modifiedCount = session.totalListeners / 1000;
      listenerTotal = `${modifiedCount.toFixed(0)}K`;
    } else if (session.totalListeners < 1000000000) {
      const modifiedCount = session.totalListeners / 1000000;
      listenerTotal = `${modifiedCount.toFixed(0)}M`;
    } else if (session.totalListeners < 1000000000000) {
      const modifiedCount = session.totalListeners / 1000000000;
      listenerTotal = `${modifiedCount.toFixed(0)}B`;
    }

    if (session.distance === -1) {
      formattedDistance = '--';
    } else if (session.distance < 1000) {
      formattedDistance = session.distance;
    } else if (session.distance < 1000000) {
      const modifiedCount = session.distance / 1000;
      formattedDistance = `${modifiedCount.toFixed(0)}K`;
    } else if (session.distance < 1000000000) {
      const modifiedCount = session.distance / 1000000;
      formattedDistance = `${modifiedCount.toFixed(0)}M`;
    } else if (session.distance < 1000000000000) {
      const modifiedCount = session.distance / 1000000000;
      formattedDistance = `${modifiedCount.toFixed(0)}B`;
    }

    return (
      <LiveSessionCard
        joinSession={this.joinSession(item)}
        openModal={this.openModal(item)}
        sessionID={item}
        displayName={owner.displayName}
        profileImage={owner.profileImage}
        name={track.name}
        artists={track.artists.map(a => a.name).join(', ')}
        album={album.name}
        listeners={listenerTotal}
        distance={formattedDistance}
      />
    );
  }

  paginate() {
    const {
      paginateTrendingSessions,
      sessions: {
        sessionsByID,
        paginatingSessions,
        explore: {trendingCanPaginate, trendingSessions},
      },
    } = this.props;

    if (trendingSessions.length !== 0 && trendingCanPaginate && !paginatingSessions) {
      const sessionID = trendingSessions[trendingSessions.length - 1];
      const cursor = sessionsByID[sessionID].totalListeners;
      paginateTrendingSessions(cursor);
    }
  }

  renderFooter() {
    const {
      sessions: {
        paginatingSessions,
        explore: {trendingCanPaginate},
      },
    } = this.props;

    if (!paginatingSessions || !trendingCanPaginate) return null;

    return (
      <View style={styles.footer}>
        {(paginatingSessions && trendingCanPaginate) &&
          <Image style={styles.loadingGif} source={require('../../images/loading.gif')} />
        }
      </View>
    );
  }

  refresh() {
    const {
      getTrendingSessions,
      sessions: {refreshingSessions},
    } = this.props;

    if (!refreshingSessions) getTrendingSessions();
  }

  render() {
    const {sessionModalOpen, shadowOpacity} = this.state;
    const {
      users: {error: userError},
      sessions: {
        fetchingSessions,
        refreshingSessions,
        error: sessionError,
        explore: {trendingSessions},
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <View style={styles.leftIcon}></View>
            <Text style={styles.title}>Explore</Text>
            <View style={styles.rightIcon} />
          </View>
        </Animated.View>
        {trendingSessions.length !== 0 &&
          <VirtualizedList
            style={styles.scrollContainer}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            data={trendingSessions}
            renderItem={this.renderSession}
            keyExtractor={item => item}
            ListFooterComponent={this.renderFooter}
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            onEndReached={this.paginate}
            onEndReachedThreshold={0.7}
            onRefresh={this.refresh}
            refreshing={refreshingSessions}
          />
        }
        {(trendingSessions.length === 0 || !trendingSessions.length) &&
          <ScrollView
            style={styles.scrollContainer}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={refreshingSessions}
                onRefresh={this.refresh}
              />
            }
          >
            <View style={styles.scrollWrap}>
              {fetchingSessions &&
                <View>
                  <LoadingSession />
                  <LoadingSession />
                  <LoadingSession />
                  <LoadingSession />
                </View>
              }
              {!fetchingSessions &&
                <View style={styles.inner}>
                  {sessionError === 'Unauthorized' && <Text>Allow permission to access location</Text>}
                  {(!userError || !sessionError) && <Text>Nothing to show</Text>}
                  {(userError || (sessionError && sessionError !== 'Unauthorized')) &&
                    <Text>There was an error</Text>
                  }
                </View>
              }
            </View>
          </ScrollView>
        }
        <Modal
          isVisible={sessionModalOpen}
          backdropColor={'#1b1b1e'}
          backdropOpacity={0.7}
          animationIn='slideInUp'
          animationInTiming={230}
          backdropTransitionInTiming={230}
          animationOut='slideOutDown'
          animationOutTiming={230}
          backdropTransitionOutTiming={230}
          hideModalContentWhileAnimating
          useNativeDriver={true}
          style={styles.modal}
          onBackdropPress={this.closeModal}
        >
          {this.renderSessionModal()}
        </Modal>
      </View>
    );
  }
}

ExploreTabView.propTypes = {
  albums: PropTypes.object,
  artists: PropTypes.object,
  getFollowingSessions: PropTypes.func.isRequired,
  getNearbySessions: PropTypes.func.isRequired,
  getTrendingSessions: PropTypes.func.isRequired,
  joinSession: PropTypes.func.isRequired,
  paginateFollowingSessions: PropTypes.func.isRequired,
  paginateNearbySessions: PropTypes.func.isRequired,
  paginateTrendingSessions: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  queue: PropTypes.object.isRequired,
  sessions: PropTypes.object.isRequired,
  tracks: PropTypes.object,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({albums, artists, player, queue, sessions, tracks, users}) {
  return {
    albums,
    artists,
    player,
    queue,
    sessions,
    tracks,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getFollowingSessions,
    getNearbySessions,
    getTrendingSessions,
    joinSession,
    paginateFollowingSessions,
    paginateNearbySessions,
    paginateTrendingSessions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreTabView);