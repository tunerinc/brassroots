'use strict';

import React from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import {Text, View, ScrollView, Animated, Easing, RefreshControl} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import HTML from 'react-native-render-html';
import Placeholder from 'rn-placeholder';
import styles from './styles';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';

// Legal Action Creators
import {getTerms} from '../../actions/legal/GetTerms';

const screenWidth = Dimensions.get('window').width;

class TermsServiceView extends React.Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);

    this.shadowOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    const {getTerms, legal: {terms: {text}}} = this.props;
    
    if (text === '') {
      getTerms();
    }
  }

  onScroll({nativeEvent: {contentOffset: {y}}}) {
    if (y > 0) {
      if (this.shadowOpacity != 0.9) {
        Animated.timing(this.shadowOpacity, {
          toValue: 0.9,
          duration: 75,
          easing: Easing.linear,
        }).start();
      };
    } else {
      Animated.timing(this.shadowOpacity, {
        toValue: 0,
        duration: 75,
        easing: Easing.linear,
      }).start();
    }
  }

  handleRefresh() {
    const {getTerms, legal: {terms: {fetchingTerms, refreshingTerms}}} = this.props;

    if (fetchingTerms || refreshingTerms) return;

    getTerms(true);
  }

  render() {
    const animatedHeaderStyle = {shadowOpacity: this.shadowOpacity};
    const {legal: {terms: {text, fetchingTerms, refreshingTerms, error}}} = this.props;
    const emptyTerms = fetchingTerms && !refreshingTerms && text === '';
    const termsExists = (!fetchingTerms || refreshingTerms) && (text !== '' || error);

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, animatedHeaderStyle]}>
          <View style={styles.nav}>
            <Icon
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={Actions.pop}
            />
            <Text style={styles.title}>Terms of Service</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        {emptyTerms &&
          <View style={styles.spinnerWrap}>
            <Placeholder.Paragraph
              animate='fade'
              lineNumber={25}
              textSize={14}
              lineSpacing={8.4}
              color='#888'
              width='100%'
            />
          </View>
        }
        {termsExists &&
          <ScrollView
            style={styles.termsWrap}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl refreshing={refreshingTerms} onRefresh={this.handleRefresh} />
            }
          >
            {error && <Text>Unable to retrieve terms of service.</Text>}
            {text !== '' &&
              <HTML
                html={text}
                imagesMaxWidth={screenWidth}
                baseFontStyle={{color: '#fefefe', fontFamily: 'Muli'}}
                tagsStyles={{p: {margin: 0}}}
              />
            }
          </ScrollView>
        }
      </View>
    );
  }
}

TermsServiceView.propTypes = {
  legal: PropTypes.object.isRequired,
  getTerms: PropTypes.func.isRequired,
};

function mapStateToProps({legal}) {
  return {legal};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getTerms}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsServiceView);