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
    const {settings: {preference}} = this.props;

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
            <Text style={styles.title}>Preferences</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <ScrollView
          style={styles.preferencesWrap}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>PLAYLISTS I CREATE ARE AUTOMATICALLY</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>Hidden</Text>
                <Ionicons
                  name='md-checkmark'
                  color='#2b6dc0'
                  style={[
                    styles.optionCheck,
                    {opacity: preference.playlist === 'hidden' ? 1 : 0},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>VIP</Text>
                <Ionicons
                  name='md-checkmark'
                  color='#2b6dc0'
                  style={[
                    styles.optionCheck,
                    {opacity: preference.playlist === 'vip' ? 1 : 0},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>Limitless</Text>
                <Ionicons
                  name='md-checkmark'
                  color='#2b6dc0'
                  style={[
                    styles.optionCheck,
                    {opacity: preference.playlist === 'limitless' ? 1 : 0},
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
                  color='#2b6dc0'
                  style={[styles.optionCheck, {opacity: preference.session === 'dj' ? 1 : 0}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>Radio mode</Text>
                <Ionicons
                  name='md-checkmark'
                  color='#2b6dc0'
                  style={[styles.optionCheck, {opacity: preference.session === 'radio' ? 1 : 0}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>Party mode</Text>
                <Ionicons
                  name='md-checkmark'
                  color='#2b6dc0'
                  style={[styles.optionCheck, {opacity: preference.session === 'party' ? 1 : 0}]}
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
                  color='#2b6dc0'
                  style={[
                    styles.optionCheck,
                    {opacity: preference.message === 'following' ? 1 : 0},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>anyone</Text>
                <Ionicons
                  name='md-checkmark'
                  color='#2b6dc0'
                  style={[
                    styles.optionCheck,
                    {opacity: preference.message === 'anyone' ? 1 : 0},
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