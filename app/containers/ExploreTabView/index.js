'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {
  Text,
  View,
  TouchableOpacity,
  VirtualizedList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {onScroll} from 'react-native-redash';
import Animated from 'react-native-reanimated';
import moment from 'moment-timezone';
moment.tz.setDefault("America/Chicago");
import debounce from "lodash.debounce";
import Modal from 'react-native-modal';
import LoadingSession from '../../components/LoadingSession';
import SessionFilterModal from '../../components/SessionFilterModal';
import LiveSessionCard from '../../components/LiveSessionCard';
import SessionModal from '../../components/SessionModal';
import styles from './styles';

// Sessions Action Creators
import {getTrendingSessions} from '../../actions/sessions/GetTrendingSessions';
import {joinSession} from '../../actions/sessions/JoinSession';
import {paginateTrendingSessions} from '../../actions/sessions/PaginateTrendingSessions';
import Notify from '../../components/Notify';

const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);
const {Value, interpolate, Extrapolate} = Animated;

class ExploreTabView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSession: null,
      sessionModalOpen: false,
      notify: false,
      notifyMsg: '',
      refresh:false,
      y: new Value(0),
      inactiveSessions: [],
    };

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

    this._paginate = debounce(this.paginate, 50);
  }

  componentDidMount() {
    const {
      getTrendingSessions,
      sessions: {explore: {trendingLastUpdated, trendingIDs}},
    } = this.props;
    const lastUpdated = moment(trendingLastUpdated, 'ddd, MMM D, YYYY, h:mm:ss a');
    const timeDiff = moment().diff(lastUpdated, 'minutes', true);

    if (timeDiff >= 1 || trendingIDs.length === 0) {
      setTimeout(getTrendingSessions, 100);
    }
  }

  componentDidUpdate(prevProps) {
    // const { sessions: { live, currentSessionID, }, } = this.props;
    // const { sessions: { live: oldLive } } = prevProps;
    // if (live == true && live !== oldLive) {
    //   this.setState((prevState => ({ inactiveSessions: [...prevState.inactiveSessions, currentSessionID,] })));
    //   alert(currentSessionID);
    // }
    const {
      sessions: {
        error: sessionError,
      },
    } = this.props;
    const {
      sessions: {
        error: oldSessionError,
      },
    } = prevProps;

    if (sessionError && sessionError !== 'Unauthorized' && sessionError !== oldSessionError) {
      this.setState({notify:true,notifyMsg:sessionError.message,});
    }
  }

  openModal = selectedSession => () => this.setState({selectedSession, sessionModalOpen: true});

  closeModal = () => this.setState({sessionModalOpen: false});

  renderSessionModal() {
    const {selectedSession} = this.state;
    const {
      entities: {sessions, users},
      users: {currentUserID},
    } = this.props;
    const {following} = users.byID[currentUserID];

    if (!sessions.allIDs.includes(selectedSession)) return <View></View>;

    const sessionOwner = users.byID[sessions.byID[selectedSession].ownerID] || null;

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
    this.setState({notify:false,});
    const {
      joinSession,
      entities: {sessions, tracks, users},
      player: {currentTrackID},
      queue: {unsubscribe: queueUnsubscribe},
      sessions: {currentSessionID, infoUnsubscribe},
      users: {currentUserID},
    } = this.props;
    const inSession = typeof currentSessionID === 'string';
    const track = inSession ? tracks.byID[currentTrackID] : null;
    const owner = inSession ? users.byID[sessions.byID[currentSessionID].ownerID] : null;
    const user = users.byID[currentUserID];
    const session = {
      queueUnsubscribe: !queueUnsubscribe ? () => console.log('queue unsub') : queueUnsubscribe,
      infoUnsubscribe: !infoUnsubscribe ? () => console.log('info unsub') : infoUnsubscribe,
      track,
      chatUnsubscribe: inSession ? () => console.log('chat unsub') : null,
      id: sessionID,
      owner: inSession ? {id: owner.id, name: owner.displayName, image: owner.profileImage} : null,
      current: inSession ? currentSessionID : null,
      total: inSession ? sessions.byID[currentSessionID].totalListeners : null,
      live: inSession ? sessions.byID[currentSessionID].live : null,
    };

    if (currentSessionID === sessionID && session.live) {
      Actions.liveSession();
    } else {
      joinSession(
        session,
        {id: user.id, displayName: user.displayName, profileImage: user.profileImage},
        inSession,
      );
    }
  }

  renderSession({item}) {
    const {entities: {sessions, tracks, users}} = this.props;
    const {refresh}=this.state;
    const session = sessions.byID[item];

    if (!session) return <View></View>;

    const track = tracks.byID[session.currentTrackID];
    const owner = users.byID[session.ownerID];
    const live = session.live;

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
        album={track.album.name}
        listeners={listenerTotal}
        distance={formattedDistance}
        // live={live}
        refresh={refresh}
      />
    );
  }

  paginate() {
    const {
      paginateTrendingSessions,
      entities: {sessions},
      sessions: {
        paginating,
        explore: {trendingCanPaginate, trendingIDs},
      },
      users: {currentUserID},
    } = this.props;

    if (trendingIDs.length !== 0 && trendingCanPaginate && !paginating) {
      const sessionID = trendingIDs[trendingIDs.length - 1];
      const {totalListeners: cursor} = sessions.byID[sessionID];
      paginateTrendingSessions(currentUserID, cursor);
    }
  }

  renderFooter() {
    const {sessions: {paginating, explore: {trendingCanPaginate}}} = this.props;

    if (!paginating || !trendingCanPaginate) return null;

    return (
      <View style={styles.footer}>
        {(paginating && trendingCanPaginate) &&
          <FastImage style={styles.loadingGif} source={require('../../images/loading.gif')} />
        }
      </View>
    );
  }

  refresh() {
    this.setState({notify:false, refresh:true,});
    const {getTrendingSessions, sessions: {refreshing}} = this.props;
    if (!refreshing) getTrendingSessions();
  }

  render() {
    const {sessionModalOpen, y} = this.state;
    const shadowOpacity = interpolate(y, {
      inputRange: [0, 20],
      outputRange: [0, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });

    const {notify,notifyMsg,}=this.state;

    const {
      users: {error: userError},
      sessions: {
        fetching,
        refreshing,
        error: sessionError,
        explore: {trendingIDs},
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
        {trendingIDs.length !== 0 &&
          <AnimatedVirtualizedList
            style={styles.scrollContainer}
            onScroll={onScroll({y})}
            scrollEventThrottle={16}
            data={trendingIDs}
            renderItem={this.renderSession}
            keyExtractor={item => item}
            ListFooterComponent={this.renderFooter}
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            onEndReached={this._paginate}
            onEndReachedThreshold={0.7}
            onRefresh={this.refresh}
            refreshing={refreshing}
          />
        }
        {notify && <Notify
          title="Message"
          message={notifyMsg}
          duration={2000}
          type="danger"
        />}
        {(trendingIDs.length === 0 || !trendingIDs.length) &&
          <ScrollView
            style={styles.scrollContainer}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.refresh}
              />
            }
          >
            <View style={styles.scrollWrap}>
              {fetching.includes('trending') &&
                <View>
                  <LoadingSession />
                  <LoadingSession />
                  <LoadingSession />
                  <LoadingSession />
                  <LoadingSession />
                  <LoadingSession />
                  <LoadingSession />
                  <LoadingSession />
                </View>
              }
              {!fetching.includes('trending') &&
                <View style={styles.inner}>
                  {sessionError === 'Unauthorized' && <Text>Allow permission to access location</Text>}
                  {(!userError || !sessionError) && <Text>Nothing to show</Text>}
                  {(userError || (sessionError && sessionError !== 'Unauthorized')) &&
                    <Text>There was an error</Text>
                  }
                  {/* {(sessionError&&sessionError!=='Unauthorized')&&<Notify
                    title="Welcome to Artisan App"
                    message={`We connect customers to artisans at their convinience, in just a click!`}
                    duration={8000}
                />} */}
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
          animationInTiming={200}
          backdropTransitionInTiming={200}
          animationOut='slideOutDown'
          animationOutTiming={200}
          backdropTransitionOutTiming={200}
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
  entities: PropTypes.object.isRequired,
  getTrendingSessions: PropTypes.func.isRequired,
  joinSession: PropTypes.func.isRequired,
  paginateTrendingSessions: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  queue: PropTypes.object.isRequired,
  sessions: PropTypes.object.isRequired,
  tracks: PropTypes.object,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({entities, player, queue, sessions, tracks, users}) {
  return {
    entities,
    player,
    queue,
    sessions,
    tracks,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getTrendingSessions,
    joinSession,
    paginateTrendingSessions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreTabView);