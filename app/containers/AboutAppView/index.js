'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import moment from 'moment';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

class AboutAppView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {year: moment().format('YYYY')};

    this.navToTerms = this.navToTerms.bind(this);
    this.navToPolicy = this.navToPolicy.bind(this);
  }

  navToTerms() {
    const {title} = this.props;

    switch (title) {
      case 'Library':
        Actions.libProTermsService();
        return;
      case 'Profile':
        Actions.proTermsService();
        return;
      default:
        return;
    }
  }

  navToPolicy() {
    const {title} = this.props;

    switch (title) {
      case 'Library':
        Actions.libProPrivacyPolicy();
        return;
      case 'Profile':
        Actions.proPrivacyPolicy();
        return;
      default:
        return;
    }
  }

  render() {
    const {year} = this.state;
    const {settings: {version}} = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity: 0}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>About</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        <View style={styles.wrap}>
          <View style={styles.aboutOptions}>
            <View style={styles.option}>
              <TouchableOpacity style={styles.optionWrap} onPress={this.navToTerms}>
                <Text style={styles.optionText}>Terms of Service</Text>
                <Ionicons name='ios-arrow-forward' style={styles.arrow} />
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <TouchableOpacity style={styles.optionWrap} onPress={this.navToPolicy}>
                <Text style={styles.optionText}>Privacy Policy</Text>
                <Ionicons name='ios-arrow-forward' style={styles.arrow} />
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <TouchableOpacity style={styles.optionWrap}>
                <Text style={styles.optionText}>Third-Party Software</Text>
                <Ionicons name='ios-arrow-forward' style={styles.arrow} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.section}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionHeadingText}>VERSION</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionContentText}>
                  {version}
                </Text>
              </View>
            </View>
            <View style={styles.copyright}>
              <Text style={styles.copyrightText}>Copyright © {year}, Tuner Inc.</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps({settings}) {
  return {settings};
}

export default connect(mapStateToProps)(AboutAppView);