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
import {getPolicy} from '../../actions/legal/GetPolicy';

const screenWidth = Dimensions.get('window').width;
const {Value, interpolate, Extrapolate} = Animated;

class PrivacyPolicyView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      y: new Value(0),
    };

    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    const {getPolicy, legal: {privacy: {text}}} = this.props;
    if (text === '') setTimeout(getPolicy, 100);
  }

  handleRefresh() {
    const {getPolicy, legal: {privacy: {fetching, refreshing}}} = this.props;
    if (!fetching && !refreshing) getPolicy(true);
  }

  render() {
    const {y} = this.state;
    const {legal: {privacy: {text, fetching, refreshing, error}}} = this.props;
    const emptyPolicy = fetching && !refreshing && text === '';
    const policyExists = (!fetching || refreshing) && (text !== '' || error);
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
            <Text style={styles.title}>Privacy Policy</Text>
            <View style={styles.rightIcon}></View>
          </View>
        </Animated.View>
        {emptyPolicy &&
          <View style={styles.spinnerWrap}>
            <Placeholder Animation={Fade}>
              {[...Array(40)].map(e => (
                <PlaceholderLine key={e} width={100} style={styles.loading} />
              ))}
            </Placeholder>
          </View>
        }
        {policyExists &&
          <Animated.ScrollView
            style={styles.privacyWrap}
            onScroll={onScroll({y})}
            scrollEventThrottle={1}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />
            }
          >
            {error && <Text>Unable to retrieve privacy privacy.</Text>}
            {text !== '' &&
              <HTML
                html={text}
                imagesMaxWidth={screenWidth}
                baseFontStyle={{color: '#fefefe', fontFamily: 'Muli'}}
                tagsStyles={{p: {margin: 0}}}
              />
            }
          </Animated.ScrollView>
        }
      </View>
    );
  }
}

PrivacyPolicyView.propTypes = {
  legal: PropTypes.object.isRequired,
  getPolicy: PropTypes.func.isRequired,
};

function mapStateToProps({legal}) {
  return {legal};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getPolicy}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicyView);