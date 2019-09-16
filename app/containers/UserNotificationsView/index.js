'use strict';

import React from 'react';
import {Text, View, ScrollView, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

class UserNotificationsView extends React.Component {
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

  render() {
    const {shadowOpacity} = this.state;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <ScrollView style={styles.wrap} onScroll={this.onScroll} scrollEventThrottle={16}>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNotificationsView);