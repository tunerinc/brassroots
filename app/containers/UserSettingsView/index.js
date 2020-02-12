'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import UserSettingOption from '../../components/UserSettingOption';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Settings Action Creators
import {logOut} from '../../actions/settings/LogOut';

class UserSettingsView extends React.Component {
  constructor(props) {
    super(props);
  }

  navToSetting = setting => () => {
    const {title} = this.props;

    switch (setting) {
      case 'notifications':
        title === 'Library' ? Actions.libProNotif() : Actions.proNotifications();
        return;
      case 'preferences':
        title === 'Library' ? Actions.libProPreferences() : Actions.proPreferences();
        return;
      case 'displaySound':
        title === 'Library' ? Actions.libProDisplaySound() : Actions.proDisplaySound();
        return;
      case 'langRegion':
        title === 'Library' ? Actions.libProLanguageRegion() : Actions.proLanguageRegion();
        return;
      case 'about':
        title === 'Library' ? Actions.libProAboutApp() : Actions.proAboutApp();
        return;
      case 'report':
        title === 'Library' ? Actions.libProReportProblem() : Actions.proReportProblem();
        return;
      default:
        return;
    }
  }

  render() {
    const {logOut} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Settings</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </View>
        <View style={styles.settings}>
          <UserSettingOption action={this.navToSetting('notifications')} title='Notifications' />
          <UserSettingOption action={this.navToSetting('preferences')} title='Preferences' />
          <UserSettingOption action={this.navToSetting('displaySound')} title='Display & Sound' />
          <UserSettingOption action={this.navToSetting('langRegion')} title='Language & Region' />
          <UserSettingOption action={this.navToSetting('about')} title='About' />
          {/* <UserSettingOption action={this.navToSetting('report')} title='Report Problem' /> */}
          <View style={styles.logout}>
            <TouchableOpacity style={styles.logoutWrap} onPress={logOut}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

UserSettingsView.propTypes = {
  logOut: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logOut}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsView);