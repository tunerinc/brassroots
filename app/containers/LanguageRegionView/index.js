'ues strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

class LanguageRegionView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {settings: {language, region}} = this.props;
    const getOpacity = (setting, option) => setting === option ? 1 : 0;

    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Language & Region</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </View>
        <View style={styles.wrap}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>LANGUAGE</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>english</Text>
                <Ionicons
                  name='md-checkmark'
                  style={[styles.optionCheck, {opacity: getOpacity(language, 'english')}]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>REGION</Text>
            </View>
            <View style={styles.sectionOption}>
              <TouchableOpacity style={styles.sectionOptionWrap} disabled>
                <Text style={styles.sectionOptionText}>united states</Text>
                <Ionicons
                  name='md-checkmark'
                  style={[styles.optionCheck, {opacity: getOpacity(region, 'US')}]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

LanguageRegionView.propTypes = {
  settings: PropTypes.object.isRequired,
};

function mapStateToProps({settings}) {
  return {settings};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageRegionView);