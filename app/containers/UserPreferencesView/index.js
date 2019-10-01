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

class UserPreferencesView extends React.Component {
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
    const {settings: {preference}} = this.props;
    const opacity = (setting, option) => setting === option ? 1 : 0;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Preferences</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <ScrollView style={styles.wrap} onScroll={this.onScroll} scrollEventThrottle={16}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>PLAYLISTS I CREATE ARE AUTOMATICALLY</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>Hidden</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(preference.playlist, 'hidden')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>VIP</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(preference.playlist, 'vip')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>Limitless</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(preference.playlist, 'limitless')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>MY LIVE SESSIONS ARE AUTOMATICALLY</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>DJ mode</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[styles.optionCheck, {opacity: opacity(preference.session, 'dj')}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>Radio mode</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[styles.optionCheck, {opacity: opacity(preference.session,  'radio')}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>Party mode</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[styles.optionCheck, {opacity: opacity(preference.session, 'party')}]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>RECEIVE MESSAGES FROM</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>following</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(preference.message, 'following')},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>anyone</Text>
                <Ionicons
                  name='md-checkmark'                  
                  style={[
                    styles.optionCheck,
                    {opacity: opacity(preference.message, 'anyone')},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

UserPreferencesView.propTypes = {
  settings: PropTypes.object.isRequired,
};

function mapStateToProps({settings}) {
  return {settings};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPreferencesView);