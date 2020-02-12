'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import LoadingGroup from '../../components/LoadingGroup';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

class UserGroupsView extends React.Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
    this.navBack = this.navBack.bind(this);

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
    const {groups: {fetchingGroups}} = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <Ionicons
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={this.navBack}
            />
            <Text style={styles.title}>Groups</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <ScrollView style={styles.groupsWrap} onScroll={this.onScroll} scrollEventThrottle={16}>
          {fetchingGroups &&
            <View>
              <Text>Not fetching</Text>
            </View>
          }
          {!fetchingGroups &&
            <View>
              <LoadingGroup />
              <LoadingGroup />
              <LoadingGroup />
              <LoadingGroup />
              <LoadingGroup />
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

UserGroupsView.propTypes = {
  groups: PropTypes.object.isRequired,
};

function mapStateToProps({groups}) {
  return {groups};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGroupsView);