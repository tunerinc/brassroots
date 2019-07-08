'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';

type Props = {|
  routeName: string,
  routeIndex: number,
|};

type State = {||};

export default class TabIcon extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {routeName, routeIndex} = this.props;

    return (
      <View style={styles.tabWrap}>
        {routeName === 'library' &&
          <View style={styles.tabWrap}>
            {routeIndex === 0 &&
              <View style={styles.tabWrap}>
                <Entypo
                  name='folder-music'
                  size={30}
                  style={styles.selectedTabIcon}
                  color='#fefefe'
                />
                <Text style={styles.selectedTabText}>Library</Text>
              </View>
            }
            {routeIndex !== 0 &&
              <View style={styles.tabWrap}>
                <Entypo
                  name='folder-music'
                  size={30}
                  style={styles.tabIcon}
                  color='#888'
                />
                <Text style={styles.tabText}>Library</Text>
              </View>
            }
          </View>
        }
        {routeName === 'explore' &&
          <View style={styles.tabWrap}>
            {routeIndex === 1 &&
              <View style={styles.tabWrap}>
                <Ionicons
                  name='md-compass'
                  size={30}
                  style={styles.selectedTabIcon}
                  color='#fefefe'
                />
                <Text style={styles.selectedTabText}>Explore</Text>
              </View>
            }
            {routeIndex !== 1 &&
              <View style={styles.tabWrap}>
                <Ionicons
                  name='md-compass'
                  size={30}
                  style={styles.tabIcon}
                  color='#888'
                />
                <Text style={styles.tabText}>Explore</Text>
              </View>
            }
          </View>
        }
        {routeName === 'search' &&
          <View style={styles.tabWrap}>
            {routeIndex === 2 &&
              <View style={styles.tabWrap}>
                <Ionicons
                  name='md-search'
                  size={30}
                  style={styles.selectedTabIcon}
                  color='#fefefe'
                />
                <Text style={styles.selectedTabText}>Search</Text>
              </View>
            }
            {routeIndex !== 2 &&
              <View style={styles.tabWrap}>
                <Ionicons
                  name='md-search'
                  size={30}
                  style={styles.tabIcon}
                  color='#888'
                />
                <Text style={styles.tabText}>Search</Text>
              </View>
            }
          </View>
        }
        {routeName === 'social' &&
          <View style={styles.tabWrap}>
            {routeIndex === 3 &&
              <View style={styles.tabWrap}>
                <Ionicons
                  name='ios-flash'
                  size={30}
                  style={styles.selectedTabIcon}
                  color='#fefefe'
                />
                <Text style={styles.selectedTabText}>Social</Text>
              </View>
            }
            {routeIndex !== 3 &&
              <View style={styles.tabWrap}>
                <Ionicons
                  name='ios-flash'
                  size={30}
                  style={styles.tabIcon}
                  color='#888'
                />
                <Text style={styles.tabText}>Social</Text>
              </View>
            }
          </View>
        }
        {routeName === 'profile' &&
          <View style={styles.tabWrap}>
            {routeIndex === 4 &&
              <View style={styles.tabWrap}>
                <Ionicons
                  name='md-person'
                  size={30}
                  style={styles.selectedTabIcon}
                  color='#fefefe'
                />
                <Text style={styles.selectedTabText}>Profile</Text>
              </View>
            }
            {routeIndex !== 4 &&
              <View style={styles.tabWrap}>
                <Ionicons
                  name='md-person'
                  size={30}
                  style={styles.tabIcon}
                  color='#888'
                />
                <Text style={styles.tabText}>Profile</Text>
              </View>
            }
          </View>
        }
      </View>
    );
  }
}