'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import LoadingUser from '../../components/LoadingUser';
import styles from './styles';

// Icons
import Foundation from 'react-native-vector-icons/Foundation';

class NewMessageView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shadowOpacity: new Animated.Value(0),
    };

    this.onScroll = this.onScroll.bind(this);
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

  goToNewGroup() {
    Actions.socNewGroup({creatingGroup: true});
  }

  render() {
    const {shadowOpacity} = this.state;
    const {
      title,
      groups: {fetching: groupFetching},
      users: {fetching: userFetching},
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <View style={styles.leftIcon}></View>
            <Text style={styles.title}>
              {title}
            </Text>
            <TouchableOpacity style={styles.rightIcon} onPress={Actions.pop}>
              <Text style={styles.rightIconText}>cancel</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <ScrollView style={styles.messageWrap} onScroll={this.onScroll} scrollEventThrottle={16}>
          <TouchableOpacity style={styles.newGroupButton} onPress={this.goToNewGroup}>
            <Foundation name='torsos-all' style={styles.newGroupIcon} />
            <Text style={styles.newGroupText}>New Group</Text>
          </TouchableOpacity>
          {userFetching.includes('users') && !groupFetching.includes('groups') &&
            <View>
              <Text>Not fetching</Text>
            </View>
          }
          {(!userFetching.includes('users') || groupFetching.includes('groups')) &&
            <View>
              <LoadingUser />
              <LoadingUser />
              <LoadingUser />
              <LoadingUser />
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

NewMessageView.propTypes = {
  groups: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps({groups, users}) {
  return {
    groups,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageView);