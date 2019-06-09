'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

// Playlists Action Creators
import {clearNewPlaylist} from '../../actions/playlists/ClearNewPlaylist';
import {setNewPlaylistMode} from '../../actions/playlists/SetNewPlaylistMode';
import {setNewPlaylistName} from '../../actions/playlists/SetNewPlaylistName';

class NewPlaylistNameView extends React.Component {
  constructor(props) {
    super(props);

    this.navBack = this.navBack.bind(this);
    this.handleSetPlaylistMode = this.handleSetPlaylistMode.bind(this);
    this.handleSetPlaylistName = this.handleSetPlaylistName.bind(this);
  }

  navBack() {
    const {clearNewPlaylist} = this.props;
    clearNewPlaylist();
    Actions.pop();
  }

  handleSetPlaylistMode = mode => () => {
    const {setNewPlaylistMode} = this.props;
    setNewPlaylistMode(mode);
  }

  handleSetPlaylistName(name) {
    const {setNewPlaylistName} = this.props;
    setNewPlaylistName(name);
  }

  goToSelectPhoto() {
    Actions.librarySelectPlaylistPhoto({direction: 'vertical', isSelectingPlaylistPhoto: true});
  }

  render() {
    const {playlists: {newPlaylist: {name, mode}}} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.nav}>
            <Ionicons
              name='ios-arrow-back'
              color='#fefefe'
              style={styles.leftIcon}
              onPress={this.navBack}
            />
            <Text style={styles.title}>New Playlist</Text>
            {(name !== '' && mode !== '') &&
              <TouchableOpacity style={styles.rightIcon} onPress={Actions.libraryAddMembers}>
                <Text style={[styles.rightIconText, styles.enabledText]}>next</Text>
              </TouchableOpacity>
            }
            {(name === '' || mode === '') &&
              <TouchableOpacity style={styles.rightIcon} disabled={true}>
                <Text style={[styles.rightIconText, styles.disabledText]}>next</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
        <View style={styles.newPlaylistWrap}>
          <View style={styles.newPlaylistImageName}>
            <TouchableOpacity style={styles.newPlaylistImage} onPress={this.goToSelectPhoto}>
              <FontAwesome name='camera' color='#fefefe' style={styles.newPlaylistImageIcon} />
            </TouchableOpacity>
            <View style={styles.newPlaylistName}>
              <TextInput
                style={styles.input}
                onChangeText={this.handleSetPlaylistName}
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='done'
                placeholder='Name your playlist...'
                placeholderTextColor='#888'
                value={name}
                maxLength={30}
              />
            </View>
          </View>
          <View
            style={[
              styles.newPlaylistMode,
              {
                shadowOpacity: 0.5,
                shadowColor: '#1b1b1e',
                shadowOffset: {width: 0, height: -5},
                shadowRadius: 15,
                zIndex: 0,
              }
            ]}
          >
            <TouchableOpacity
              style={styles.newPlaylistModeWrap}
              onPress={this.handleSetPlaylistMode('hidden')}
            >
              <Octicons
                name='telescope'
                color={mode === 'hidden' ? '#2b6dc0' : '#888'}
                style={styles.newPlaylistModeIcon}
              />
              <View style={styles.newPlaylistModeInfo}>
                <View style={styles.newPlaylistModeName}>
                  <Text style={styles.newPlaylistModeNameText}>Hidden</Text>
                </View>
                <View style={styles.newPlaylistModeDesc}>
                  <View style={styles.newPlaylistModeDescBullet}>
                    <Text style={styles.newPlaylistModeDescBulletText}>•</Text>
                    <Text style={styles.newPlaylistModeDescText}>Hidden from public</Text>
                  </View>
                  <View style={styles.newPlaylistModeDescBullet}>
                    <Text style={styles.newPlaylistModeDescBulletText}>•</Text>
                    <Text style={styles.newPlaylistModeDescText}>Invite-only</Text>
                  </View>
                  <View style={styles.newPlaylistModeDescBullet}>
                    <Text style={styles.newPlaylistModeDescBulletText}>•</Text>
                    <Text style={styles.newPlaylistModeDescText}>Members may only add tracks</Text>
                  </View>
                </View>
              </View>
              {mode === 'hidden' &&
                <Ionicons
                  name='md-radio-button-on'
                  color='#2b6dc0'
                  style={styles.newPlaylistModeSelect}
                />
              }
              {mode !== 'hidden' &&
                <Ionicons
                  name='md-radio-button-off'
                  color='#fefefe'
                  style={styles.newPlaylistModeSelect}
                />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.newPlaylistMode}>
            <TouchableOpacity
              style={styles.newPlaylistModeWrap}
              onPress={this.handleSetPlaylistMode('vip')}
            >
              <Foundation
                name='ticket'
                color={mode === 'vip' ? '#2b6dc0' : '#888'}
                style={styles.newPlaylistModeIcon}
              />
              <View style={styles.newPlaylistModeInfo}>
                <View style={styles.newPlaylistModeName}>
                  <Text style={styles.newPlaylistModeNameText}>VIP</Text>
                </View>
                <View style={styles.newPlaylistModeDesc}>
                  <View style={styles.newPlaylistModeDescBullet}>
                    <Text style={styles.newPlaylistModeDescBulletText}>•</Text>
                    <Text style={styles.newPlaylistModeDescText}>Public</Text>
                  </View>
                  <View style={styles.newPlaylistModeDescBullet}>
                    <Text style={styles.newPlaylistModeDescBulletText}>•</Text>
                    <Text style={styles.newPlaylistModeDescText}>Request / invite to join</Text>
                  </View>
                  <View style={styles.newPlaylistModeDescBullet}>
                    <Text style={styles.newPlaylistModeDescBulletText}>•</Text>
                    <Text style={styles.newPlaylistModeDescText}>Members may only add tracks</Text>
                  </View>
                </View>
              </View>
              {mode === 'vip' &&
                <Ionicons
                  name='md-radio-button-on'
                  color='#2b6dc0'
                  style={styles.newPlaylistModeSelect}
                />
              }
              {mode !== 'vip' &&
                <Ionicons
                  name='md-radio-button-off'
                  color='#fefefe'
                  style={styles.newPlaylistModeSelect}
                />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.newPlaylistMode}>
            <TouchableOpacity
              style={styles.newPlaylistModeWrap}
              onPress={this.handleSetPlaylistMode('limitless')}
            >
              <MaterialIcons
                name='all-inclusive'
                color={mode === 'limitless' ? '#2b6dc0' : '#888'}
                style={styles.newPlaylistModeIcon}
              />
              <View style={styles.newPlaylistModeInfo}>
                <View style={styles.newPlaylistModeName}>
                  <Text style={styles.newPlaylistModeNameText}>Limitless</Text>
                </View>
                <View style={styles.newPlaylistModeDesc}>
                  <View style={styles.newPlaylistModeDescBullet}>
                    <Text style={styles.newPlaylistModeDescBulletText}>•</Text>
                    <Text style={styles.newPlaylistModeDescText}>Public</Text>
                  </View>
                  <View style={styles.newPlaylistModeDescBullet}>
                    <Text style={styles.newPlaylistModeDescBulletText}>•</Text>
                    <Text style={styles.newPlaylistModeDescText}>Anyone may join</Text>
                  </View>
                  <View style={styles.newPlaylistModeDescBullet}>
                    <Text style={styles.newPlaylistModeDescBulletText}>•</Text>
                    <Text style={styles.newPlaylistModeDescText}>
                      Members may add and delete tracks
                    </Text>
                  </View>
                </View>
              </View>
              {mode === 'limitless' &&
                <Ionicons
                  name='md-radio-button-on'
                  color='#2b6dc0'
                  style={styles.newPlaylistModeSelect}
                />
              }
              {mode !== 'limitless' &&
                <Ionicons
                  name='md-radio-button-off'
                  color='#fefefe'
                  style={styles.newPlaylistModeSelect}
                />
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

NewPlaylistNameView.propTypes = {
  clearNewPlaylist: PropTypes.func.isRequired,
  playlists: PropTypes.object.isRequired,
  setNewPlaylistMode: PropTypes.func.isRequired,
  setNewPlaylistName: PropTypes.func.isRequired,
};

function mapStateToProps({playlists}) {
  return {playlists};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearNewPlaylist,
    setNewPlaylistMode,
    setNewPlaylistName,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlaylistNameView);