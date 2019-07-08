'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Placeholder from 'rn-placeholder';
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
          {(!loading && image !== '') && <Image style={styles.image} source={{uri: image}} />}
          {(!loading && (!image || image === '')) &&
            <View style={styles.default}>
              <Image style={styles.logo} source={require('../../images/logo.png')} />
            </View>
          }
          {(loading && (!image || image === '')) &&
            <View style={styles.default}>
              <Placeholder.Media
                animate='fade'
                size={60}
                color='#888'
                hasRadius={true}
              />
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