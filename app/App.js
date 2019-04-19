'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import configureStore from './store/configureStore';

const store = configureStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // @see: https://github.com/facebook/react-native/issues/9599
    if (typeof global.self === 'undefined') {
      global.self = global;
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Brassroots!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
