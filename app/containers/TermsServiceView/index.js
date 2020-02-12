'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView, RefreshControl, Dimensions} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {onScroll} from 'react-native-redash';
import Animated from 'react-native-reanimated';
import HTML from 'react-native-render-html';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';

// Styles
import styles from './styles';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';

// Legal Action Creators
import {getTerms} from '../../actions/legal/GetTerms';

const screenWidth = Dimensions.get('window').width;
const {Value, interpolate, Extrapolate} = Animated;

class TermsServiceView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      y: new Animated.Value(0),
    };

    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    const {getTerms, legal: {terms: {text}}} = this.props;
    if (text === '') setTimeout(getTerms, 100);
  }

  handleRefresh() {
    const {getTerms, legal: {terms: {fetching, refreshing}}} = this.props;
    if (!fetching && !refreshing) getTerms(true);
  }

  render() {
    const {y} = this.state;
    const {legal: {terms: {text, fetching, refreshing, error}}} = this.props;
    const emptyTerms = fetching && !refreshing && text === '';
    const termsExists = (!fetching || refreshing) && (text !== '' || error);
    const shadowOpacity = interpolate(y, {
      inputRange: [0, 20],
      outputRange: [0, 0.9],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.shadow, {shadowOpacity}]}>
          <View style={styles.nav}>
            <Icon name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>Terms of Service</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        {emptyTerms &&
          <View style={styles.spinnerWrap}>
            <Placeholder Animation={Fade}>
              {[...Array(40)].map(e => (
                <PlaceholderLine key={e} width={100} style={styles.loading} />
              ))}
            </Placeholder>
          </View>
        }
        {termsExists &&
          <Animated.ScrollView
            style={styles.scrollContainer}
            onScroll={onScroll({y})}
            scrollEventThrottle={1}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />
            }
          >
            <View style={styles.scrollWrap}>
              {error && <Text>Unable to retrieve terms of service.</Text>}
              {text !== '' &&
                <HTML
                  html={text}
                  imagesMaxWidth={screenWidth}
                  baseFontStyle={{color: '#fefefe', fontFamily: 'Muli'}}
                  tagsStyles={{p: {margin: 0}}}
                />
              }
            </View>
          </Animated.ScrollView>
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