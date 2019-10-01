'use strict';

import React from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import {Text, View, ScrollView, Animated, Easing, RefreshControl} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import HTML from 'react-native-render-html';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import styles from './styles';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';

// Legal Action Creators
import {getTerms} from '../../actions/legal/GetTerms';

const screenWidth = Dimensions.get('window').width;

class TermsServiceView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shadowOpacity: new Animated.Value(0),
    };

    this.onScroll = this.onScroll.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    const {getTerms, legal: {terms: {text}}} = this.props;
    if (text === '') getTerms();
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

  handleRefresh() {
    const {getTerms, legal: {terms: {fetching, refreshing}}} = this.props;
    if (!fetching && !refreshing) getTerms(true);
  }

  render() {
    const {shadowOpacity} = this.state;
    const {legal: {terms: {text, fetching, refreshing, error}}} = this.props;
    const emptyTerms = fetching && !refreshing && text === '';
    const termsExists = (!fetching || refreshing) && (text !== '' || error);

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
          <ScrollView
            style={styles.scrollContainer}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
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