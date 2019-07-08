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

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.shadowOpacity};

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <Ionicons
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={Actions.pop}
            />
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <ScrollView
          style={styles.notificationsWrap}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
        >

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