'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {|
  changeActiveView: () => any,
  viewingChat: boolean,
  viewingPlayer: boolean,
|};

type State = {||};

export default class SessionActiveViewIcon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    const {viewingChat, viewingPlayer} = this.props;
    const {viewingChat: newChat, viewingPlayer: newPlayer} = nextProps;
    return viewingChat !== newChat && viewingPlayer !== newPlayer;
  }

  render() {
    const {changeActiveView, viewingChat, viewingPlayer} = this.props;

    return (
      <TouchableOpacity style={styles.button} onPress={changeActiveView}>
        {viewingPlayer && <Entypo name='chat' style={styles.icon} />}
        {viewingChat && <MaterialCommunityIcons name='playlist-play' style={styles.icon} />}
      </TouchableOpacity>
    );
  }
}