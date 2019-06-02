'use strict';

/**
 * @format
 * @flow
 */

import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {|
  handleActiveViewChange: () => any,
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
    const {handleActiveViewChange, viewingChat, viewingPlayer} = this.props;

    return (
      <TouchableOpacity style={styles.button} onPress={handleActiveViewChange}>
        {viewingPlayer && renderChat()}
        {viewingChat && renderPlayer()}
      </TouchableOpacity>
    );
  }
}

function renderChat(): React.Node {
  return (
    <Entypo
      name='chat'
      size={35}
      color='#fefefe'
      style={styles.icon}
    />
  );
}

function renderPlayer(): React.Node {
  return (
    <MaterialCommunityIcons
      name='playlist-play'
      size={35}
      color='#fefefe'
      style={styles.icon}
    />
  );
}