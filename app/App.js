'use strict';

/**
 * @format
 * @flow
 */

 // React
import React from 'react';
import PropTypes from 'prop-types'
import {StyleSheet, StatusBar, View, Text} from 'react-native';
import {Router, Scene, Stack, Tabs, Modal} from 'react-native-router-flux';
import {
  type ViewStyleProp,
  type TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

// Store w/ Redux
import {Provider, connect} from 'react-redux';
import configureStore from './store/configureStore';

type Props = {};

interface Styles {
  container: ViewStyleProp,
  welcome: TextStyleProp,
  instructions: TextStyleProp,
};

const RouterWithRedux = connect()(Router);
const store = configureStore();
const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class App extends React.Component<Props> {
  constructor(props: {}) {
    super(props);

    // @see: https://github.com/facebook/react-native/issues/9599
    if (typeof global.self === 'undefined') {
      global.self = global;
    }
  }

  render() {
    StatusBar.setBarStyle('light-content', true);

    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Modal>
            <View style={styles.container}>
              <Text style={styles.welcome}>Welcome to Brassroots!</Text>
              <Text style={styles.instructions}>To get started, edit App.js</Text>
            </View>
          </Modal>
        </RouterWithRedux>
      </Provider>
    );
  }
}