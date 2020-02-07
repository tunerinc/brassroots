'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import FastImage from 'react-native-fast-image';
import {Text, View, TouchableOpacity} from 'react-native';
import {Placeholder, PlaceholderMedia, Fade} from 'rn-placeholder';
import styles from './styles';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {|
  onPress: () => void,
  disabled?: boolean,
  marginLeft?: number,
  loading?: boolean,
  image: ?string,
  text: string,
  showFilter?: boolean,
  filterText?: string,
  showPlus?: boolean,
|};

type State = {||};

export default class RoundPerson extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  renderImage = () => <PlaceholderMedia isRound={true} style={styles.image} />;

  render() {
    const {
      onPress,
      disabled,
      marginLeft,
      loading,
      image,
      text,
      showFilter,
      filterText,
      showPlus,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || false}
        style={[
          styles.button,
          {marginLeft: marginLeft || 0},
        ]}
      >
        <View style={styles.wrap}>
          {(typeof showFilter === 'boolean' && showFilter && typeof filterText === 'string') &&
            <View style={styles.filterWrap}>
              {showPlus &&
                <MaterialCommunityIcons name='plus' color='#fefefe' style={styles.plus} />
              }
              <Text style={styles.filterText}>
                {filterText}
              </Text>
              <View style={styles.filter}></View>
            </View>
          }
          {(
            !loading
            && typeof image === 'string'
            && image !== ''
          ) &&
            <FastImage style={styles.image} source={{uri: image}} />
          }
          {(!loading && (!image || image === '')) &&
            <View style={styles.default}>
              <FastImage style={styles.logo} source={require('../../images/logo.png')} />
            </View>
          }
          {(loading && (!image || image === '')) &&
            <View style={styles.default}>
              <Placeholder Animate={Fade} Left={this.renderImage} />
            </View>
          }
          <Text numberOfLines={1} style={styles.buttonText}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}