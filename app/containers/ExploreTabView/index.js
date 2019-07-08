'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity, Animated, Easing, VirtualizedList} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
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
      filterModalOpen: false,
      selectedSession: null,
      sessionModalOpen: false,
      selectedFilter: 'trending',
    };

    this.changeFilter = this.changeFilter.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.renderFilterContent = this.renderFilterContent.bind(this);
    this.renderSessionModal = this.renderSessionModal.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.renderSession = this.renderSession.bind(this);
    this.paginate = this.paginate.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.refresh = this.refresh.bind(this);

    this.animatedValue = new Animated.Value(0);
    this.animatedHeight = new Animated.Value(0);
    this.animatedOpacity = new Animated.Value(0);
    this.animatedIndex = new Animated.Value(-5);
    this.animatedFilterOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    const {sessionFilter} = this.state;
    const {getTrendingSessions, sessions: {trendingLastUpdated, trendingSessions}} = this.props;
    const lastUpdated = moment(trendingLastUpdated, 'ddd, MMM D, YYYY, h:mm:ss a');
    const timeDiff = moment().diff(lastUpdated, 'minutes', true);

    if (sessionFilter === 'trending' && (timeDiff >= 5 || trendingSessions.length === 0)) {
      getTrendingSessions();
    }
  }

  changeFilter = filter => () => {
    this.setState({sessionFilter: filter});
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

  renderFilterContent() {
    const {selectedFilter} = this.state;
    const {
      getFollowingSessions,
      getNearbySessions,
      getTrendingSessions,
      sessions: {
        explore: {
          trendingLastUpdated,
          trendingSessions,
          followingLastUpdated,
          followingSessions,
          nearbyLastUpdated,
          nearbySessions,
        },
      },
      users: {currentUserID},
    } = this.props;
    const getSessions = selectedFilter === 'trending'
      ? getTrendingSessions
      : selectedFilter === 'following'
      ? (currentUserID) => () => getFollowingSessions(currentUserID)
      : getNearbySessions;
    const lastUpdated = selectedFilter === 'trending'
      ? moment(trendingLastUpdated, 'ddd, MMM D, YYYY, h:mm:ss a')
      : selectedFilter === 'following'
      ? moment(followingLastUpdated, 'ddd, MMM D, YYYY, h:mm:ss a')
      : moment(nearbyLastUpdated, 'ddd, MMM D, YYYY, h:mm:ss a');
    const totalSessions = selectedFilter === 'trending'
      ? trendingSessions.length
      : selectedFilter === 'following'
      ? followingSessions.length
      : nearbySessions.length;
    const timeDiff = moment().diff(lastUpdated, 'minutes', true);

    return (
      <SessionFilterModal
        changeFilter={this.changeFilter}
        getSessions={getSessions}
        filter={selectedFilter}
        timeDiff={timeDiff}
        totalSessions={totalSessions}
      />
    );
  }

  renderSessionModal() {
    const {selectedSession} = this.state;
    const {
      sessions: {sessionsByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {following} = usersByID[currentUserID];
    const sessionOwner = usersByID[sessionsByID[selectedSession].ownerID] || null;

    return (
      <SessionModal
        toggleModal={this.toggleModal}
        isFollowing={following.includes(sessionOwner.id)}
        profileImage={sessionOwner.image}
        displayName={sessionOwner.name}
      />
    );
  }

  toggleFilters() {
    const {filterModalOpen} = this.state;
    this.setState({filterModalOpen: !filterModalOpen});
  }

  toggleModal = session => () => {
    const {sessionModalOpen, selectedSession} = this.state;

    this.setState({
      selectedSession: session || selectedSession,
      sessionModalOpen: !sessionModalOpen,
    });
  }

  joinSession = (sessionID) => () => {
    const {
      joinSession,
      chat: {chatUnsubscribe},
      queue: {unsubscribe: queueUnsubscribe},
      sessions: {currentSessionID, sessionsByID},
      tracks: {tracksByID},
      users: {currentUserID, usersByID},
    } = this.props;
    const {displayName, profileImage} = usersByID[currentUserID];
    const currentSession = sessionsByID[currentSessionID];

    let track = '';
    let owner = '';
    let total = 0;

    if (currentSessionID && sessionID === currentSessionID) {
      Actions.liveSession();
    } else {
      if (currentSession) {
        track = {
          trackID: currentSession.currentTrackID,
          id: currentSession.currentQueueID,
          name: tracksByID[currentSession.currentTrackID].name,
          trackNumber: tracksByID[currentSession.currentTrackID].trackNumber,
          durationMS: tracksByID[currentSession.currentTrackID].durationMS,
          artists: tracksByID[currentSession.currentTrackID].artists,
          album: {
            id: tracksByID[currentSession.currentTrackID].albumID,
            name: albumsByID[tracksByID[currentSession.currentTrackID].albumID].name,
            small: albumsByID[tracksByID[currentSession.currentTrackID].albumID].small,
            medium: albumsByID[tracksByID[currentSession.currentTrackID].albumID].medium,
            large: albumsByID[tracksByID[currentSession.currentTrackID].albumID].large,
            artists: albumsByID[tracksByID[currentSession.currentTrackID].albumID].artists,
          },
        };

        total = currentSession.totalListeners;
        owner = {
          id: currentSession.ownerID,
          name: usersByID[currentSession.ownerID].displayName,
          image: usersByID[currentSession.ownerID].profileImage,
        };
      };

      const session = {
        id: sessionID,
        track,
        total,
        owner,
        chatUnsubscribe,
        queueUnsubscribe,
      };
  
      joinSession(
        session,
        {id: currentUserID, displayName, profileImage},
        currentSessionID ? true : false,
      );
    }
  }

  renderSession({item}) {
    const {
      albums: {albumsByID},
      sessions: {sessionsByID},
      tracks: {tracksByID},
      users: {usersByID},
    } = this.props;
    const session = sessionsByID[item];
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
        toggleModal={this.toggleModal}
        sessionID={item}
        displayName={owner.displayName}
        profileImage={owner.profileImage}
        name={track.name}
        artists={track.artists}
        album={album.name}
        listeners={listenerTotal}
        distance={formattedDistance}
      />
    );
  }

  paginate() {
    const {sessionFilter} = this.state;
    const {
      paginateFollowingSessions,
      paginateNearbySessions,
      paginateTrendingSessions,
      sessions: {
        paginatingSessions,
        explore: {
          followingSessions,
          nearbySessions,
          trendingSessions,
          followingCanPaginate,
          nearbyCanPaginate,
          trendingCanPaginate,
        },
      },
    } = this.props;

    let length = trendingSessions.length;
    let func = paginateTrendingSessions;
    let canPaginate = trendingCanPaginate;

    if (sessionFilter === 'following') {
      length = followingSessions.length;
      func = paginateFollowingSessions;
      canPaginate = followingCanPaginate;
    } else if (sessionFilter === 'nearby') {
      length = nearbySessions.length;
      func = paginateNearbySessions;
      canPaginate = nearbyCanPaginate;
    }

    if (length % 15 === 0 && canPaginate) {
      if (!paginatingSessions) {
        func();
      }
    } else {

    }
  }

  renderFooter() {
    const {sessionFilter} = this.state;
    const {
      sessions: {
        paginatingSessions,
        explore: {
          followingCanPaginate,
          nearbyCanPaginate,
          trendingCanPaginate
        },
      },
    } = this.props;

    let canPaginate = trendingCanPaginate;
    
    if (sessionFilter === 'following') {
      canPaginate = followingCanPaginate;
    } else if (sessionFilter === 'nearby') {
      canPaginate = nearbyCanPaginate;
    }

    if (!paginatingSessions || !canPaginate) return null;

    return (
      <View style={styles.footer}>
        {paginatingSessions && canPaginate &&
          <Image style={styles.loadingGif} source={require('../../images/loading.gif')} />
        }
      </View>
    );
  }

  refresh() {
    const {sessionFilter} = this.state;
    const {
      getFollowingSessions,
      getNearbySessions,
      getTrendingSessions,
      users: {currentUserID},
    } = this.props;

    if (sessionFilter === 'following') {
      getFollowingSessions(currentUserID);
    } else if (sessionFilter === 'nearby') {
      getNearbySessions();
    } else {
      getTrendingSessions();
    }
  }

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.animatedValue};
    const {sessionFilter, filterModalOpen, sessionModalOpen} = this.state;
    const {
      users: {error: userError},
      sessions: {
        fetchingSessions,
        refreshingSessions,
        error: sessionError,
        explore: {followingSessions, nearbySessions, trendingSessions},
      },
    } = this.props;

    let sessionsToDisplay = [];

    if (sessionFilter === 'following') {
      sessionsToDisplay = [...followingSessions];
    } else if (sessionFilter === 'nearby') {
      sessionsToDisplay = [...nearbySessions];
    } else {
      sessionsToDisplay = [...trendingSessions];
    }

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <View style={styles.leftIcon}></View>
            <Text style={styles.title}>Explore</Text>
            <TouchableOpacity style={styles.rightIcon} onPress={this.toggleFilters}>
              {filterModalOpen && <Text style={styles.rightIconText}>close</Text> }
              {!filterModalOpen && <Text style={styles.rightIconText}>filter</Text> }
            </TouchableOpacity>
          </View>
        </Animated.View>
        {sessionsToDisplay.length !== 0 &&
          <VirtualizedList
            style={styles.exploreWrap}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            data={sessionsToDisplay}
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
        {sessionsToDisplay.length === 0 || !sessionsToDisplay.length &&
          <View style={styles.exploreWrap}>
            {fetchingSessions &&
              <View style={styles.inner}>
                <LoadingSession />
                <LoadingSession />
                <LoadingSession />
              </View>
            }
            {!fetchingSessions &&
              <View style={styles.inner}>
                {sessionError === 'Unauthorized' && <Text>Allow permission to access location</Text>}
                {!userError || !sessionError && <Text>Nothing to show</Text>}
                {userError || (sessionError && sessionError !== 'Unauthorized') &&
                  <Text>Unable to retrieve live sessions</Text>
                }
              </View>
            }
          </View>
        }
        <Modal
          isVisible={filterModalOpen}
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
          onBackdropPress={this.toggleFilters}
        >
          {this.renderFilterContent()}
        </Modal>
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
          onBackdropPress={this.toggleModal()}
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
  sessions: PropTypes.object.isRequired,
  tracks: PropTypes.object,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({albums, artists, sessions, tracks, users}) {
  return {
    albums,
    artists,
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