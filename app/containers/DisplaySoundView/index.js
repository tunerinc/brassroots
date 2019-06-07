'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView, Animated, Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

class DisplaySoundView extends React.Component {
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
    const {settings: {theme, soundEffects}} = this.props;

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
            <Text style={styles.title}>Display & Sound</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <ScrollView
          style={styles.displaySoundWrap}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>SOUND EFFECTS</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled={true}>
                <Text style={styles.sectionOptionText}>off</Text>
                <Ionicons
                  name='md-checkmark'
                  color='#2b6dc0'
                  style={[styles.optionCheck, {opacity: soundEffects ? 0 : 1}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled={true}>
                <Text style={styles.sectionOptionText}>on</Text>
                <Ionicons
                  name='md-checkmark'
                  color='#2b6dc0'
                  style={[styles.optionCheck, {opacity: soundEffects ? 1 : 0}]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>THEME</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled={true}>
                <Text style={styles.sectionOptionText}>light</Text>
                <Ionicons
                  name='md-checkmark'
                  color='#2b6dc0'
                  style={[styles.optionCheck, {opacity: theme === 'light' ? 1 : 0}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled={true}>
                <Text style={styles.sectionOptionText}>dark</Text>
                <Ionicons
                  name='md-checkmark'
                  color='#2b6dc0'
                  style={[styles.optionCheck, {opacity: theme === 'dark' ? 1 : 0}]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

DisplaySoundView.propTypes = {
  settings: PropTypes.object.isRequired,
};

function mapStateToProps({settings}) {
  return {settings};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySoundView);