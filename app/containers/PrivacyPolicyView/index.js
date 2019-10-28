'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ScrollView,
  Animated,
  Easing,
  RefreshControl,
  Dimensions,
  InteractionManager,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import HTML from 'react-native-render-html';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import styles from './styles';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';

// Legal Action Creators
import {getPolicy} from '../../actions/legal/GetPolicy';

const screenWidth = Dimensions.get('window').width;

class PrivacyPolicyView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shadowOpacity: new Animated.Value(0),
    };

    this.onScroll = this.onScroll.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    const {getPolicy, legal: {privacy: {text}}} = this.props;

    InteractionManager.runAfterInteractions(() => {
      if (text === '') getPolicy();
    });
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
    const {getPolicy, legal: {privacy: {fetching, refreshing}}} = this.props;
    if (!fetching && !refreshing) getPolicy(true);
  }

  render() {
    const {shadowOpacity} = this.state;
    const {legal: {privacy: {text, fetching, refreshing, error}}} = this.props;
    const emptyPolicy = fetching && !refreshing && text === '';
    const policyExists = (!fetching || refreshing) && (text !== '' || error);

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
          <ScrollView
            style={styles.privacyWrap}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
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
          </ScrollView>
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