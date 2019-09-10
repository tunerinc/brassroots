'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView, Animated, Easing, TextInput} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Settings Action Creators
import {updateFeedback} from '../../actions/feedback/UpdateFeedback';

class ReportUserView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputHeight: 64,
      shadowOpacity: new Animated.Value(0),
    };

    this.onScroll = this.onScroll.bind(this);
    this.handleSetReportMessage = this.handleSetReportMessage.bind(this);
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

  handleSetReportMessage({nativeEvent: {text, contentSize: {height}}}) {
    const {updateFeedback} = this.props;

    this.setState({inputHeight: height});
    updateFeedback({text});
  }

  render() {
    const {inputHeight, shadowOpacity} = this.state;
    const {feedback: {types, text}} = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Report User</Text>
            {types.length !== 0 && text !== '' &&
              <TouchableOpacity style={styles.rightIcon} disabled={true}>
                <Text style={[styles.rightIconText, styles.enabledText]}>send</Text>
              </TouchableOpacity>
            }
            {(types.length === 0 || text === '') &&
              <TouchableOpacity style={styles.rightIcon} disabled={true}>
                <Text style={[styles.rightIconText, styles.disabledText]}>send</Text>
              </TouchableOpacity>
            }
          </View>
        </Animated.View>
        <ScrollView style={styles.reportWrap} onScroll={this.onScroll} scrollEventThrottle={16}>
          <View style={styles.sectionOption}>
            <TouchableOpacity style={styles.sectionOptionWrap} disabled={true}>
              <Text style={styles.sectionOptionText}>It's Spam</Text>
              {types.includes('spam') &&
                <Ionicons name='md-radio-button-on' color='#2b6dc0' style={styles.optionCheck} />
              }
              {!types.includes('spam') &&
                <Ionicons name='md-radio-button-off' color='#fefefe' style={styles.optionCheck} />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.sectionOption}>
            <TouchableOpacity style={styles.sectionOptionWrap} disabled={true}>
              <Text style={styles.sectionOptionText}>Something Isn't Working</Text>
              {types.includes('inappropriate') &&
                <Ionicons name='md-radio-button-on' color='#2b6dc0' style={styles.optionCheck} />
              }
              {!types.includes('inappropriate') &&
                <Ionicons name='md-radio-button-off' color='#fefefe' style={styles.optionCheck} />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.reportMessage}>
            <TextInput
              multiline={true}
              onChange={this.handleSetReportMessage}
              placeholder='Add a message...'
              placeholderTextColor='#888'
              placeholderStyle={{fontWeight: '600'}}
              value={text}
              maxLength={300}
              style={[
                styles.input,
                {
                  height: Math.max(64, inputHeight),
                  paddingTop: 18,
                  paddingBottom: 18,
                }
              ]}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

ReportUserView.propTypes = {
  feedback: PropTypes.object.isRequired,
  updateFeedback: PropTypes.func.isRequired,
};

function mapStateToProps({feedback}) {
  return {feedback};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateFeedback}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportUserView);