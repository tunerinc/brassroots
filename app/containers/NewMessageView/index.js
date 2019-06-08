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

    this.onScroll = this.onScroll.bind(this);

    this.shadowOpacity = new Animated.Value(0);
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

  goToNewGroup() {
    Actions.socialNewGroup({creatingGroup: true});
  }

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.shadowOpacity};
    const {
      title,
      groups: {fetchingGroups},
      users: {fetchingUsers},
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
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
            <Foundation name='torsos-all' color='#fefefe' style={styles.newGroupIcon} />
            <Text style={styles.newGroupText}>New Group</Text>
          </TouchableOpacity>
          {fetchingUsers && !fetchingGroups &&
            <View>
              <Text>Not fetching</Text>
            </View>
          }
          {!fetchingUsers || fetchingGroups &&
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