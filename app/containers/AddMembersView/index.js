'use strict';

import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Placeholder, PlaceholderMedia, PlaceholderLine, Fade} from 'rn-placeholder';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

class AddMembersView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {shadowOpacity: new Animated.Value(0)};

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

  renderLoadingUser() {
    return (
      <View style={styles.user}>
        <Placeholder Animate={Fade}>
          <View style={styles.userWrap}>
            <PlaceholderMedia isRound={true} style={styles.userImage} />
            <PlaceholderLine width={81} style={styles.userText} />
          </View>
        </Placeholder>
      </View>
    );
  }

  render() {
    const {shadowOpacity} = this.state;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Add Members</Text>
            <TouchableOpacity style={styles.rightIcon} disabled={true}>
              <Text style={[styles.rightIconText, styles.disabledText]}>next</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <ScrollView style={styles.scrollContainer} onScroll={this.onScroll} scrollEventThrottle={16}>
          <View style={styles.scrollWrap}>
            {this.renderLoadingUser()}
            {this.renderLoadingUser()}
            {this.renderLoadingUser()}
            {this.renderLoadingUser()}
            {this.renderLoadingUser()}
            {this.renderLoadingUser()}
            {this.renderLoadingUser()}
            {this.renderLoadingUser()}
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddMembersView);