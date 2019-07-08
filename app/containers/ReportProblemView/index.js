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
import {setReportMessage} from '../../actions/feedback/SetReportMessage';

class ReportProblemView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {inputHeight: 64};

    this.onScroll = this.onScroll.bind(this);
    this.handleSetReportMessage = this.handleSetReportMessage.bind(this);

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

  handleSetReportMessage({nativeEvent: {text, contentSize: {height}}}) {
    const {setReportMessage} = this.props;

    this.setState({inputHeight: height});
    setReportMessage(text);
  }

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.shadowOpacity};
    const {inputHeight} = this.state;
    const {feedback: {types, message}} = this.props;

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
            <Text style={styles.title}>Report Problem</Text>
            {types.length !== 0 && message !== '' &&
              <TouchableOpacity style={styles.rightIcon} disabled={true}>
                <Text style={[styles.rightIconText, styles.enabledText]}>send</Text>
              </TouchableOpacity>
            }
            {types.length === 0 || message === '' &&
              <TouchableOpacity style={styles.rightIcon} disabled={true}>
                <Text style={[styles.rightIconText, styles.disabledText]}>send</Text>
              </TouchableOpacity>
            }
          </View>
        </Animated.View>
        <ScrollView style={styles.reportWrap} onScroll={this.onScroll} scrollEventThrottle={16}>
          <View style={styles.sectionOption}>
            <TouchableOpacity style={styles.sectionOptionWrap} disabled={true}>
              <Text style={styles.sectionOptionText}>Spam or Abuse</Text>
              {types.indexOf('spam or abuse') !== -1 &&
                <Ionicons name='md-radio-button-on' color='#2b6dc0' style={styles.optionCheck} />
              }
              {types.indexOf('spam or abuse') === -1 &&
                <Ionicons name='md-radio-button-off' color='#fefefe' style={styles.optionCheck} />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.sectionOption}>
            <TouchableOpacity style={styles.sectionOptionWrap} disabled={true}>
              <Text style={styles.sectionOptionText}>Something Isn't Working</Text>
              {types.indexOf('broken') !== -1 &&
                <Ionicons name='md-radio-button-on' color='#2b6dc0' style={styles.optionCheck} />
              }
              {types.indexOf('broken') === -1 &&
                <Ionicons name='md-radio-button-off' color='#fefefe' style={styles.optionCheck} />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.sectionOption}>
            <TouchableOpacity style={styles.sectionOptionWrap} disabled={true}>
              <Text style={styles.sectionOptionText}>General Feedback</Text>
              {types.indexOf('general feedback') !== -1 &&
                <Ionicons name='md-radio-button-on' color='#2b6dc0' style={styles.optionCheck} />
              }
              {types.indexOf('general feedback') === -1 &&
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
              value={message}
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

ReportProblemView.propTypes = {
  feedback: PropTypes.object.isRequired,
  setReportMessage: PropTypes.func.isRequired,
};

function mapStateToProps({feedback}) {
  return {feedback};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setReportMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportProblemView);