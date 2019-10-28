'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import selectPhoto from '../../utils/selectPhoto';
import FastImage from 'react-native-fast-image';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initialState} from '../../reducers/playlists';
import styles from './styles';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

// Playlists Action Creators
import {updatePlaylists} from '../../actions/playlists/UpdatePlaylists';

class NewPlaylistNameView extends React.Component {
  constructor(props) {
    super(props);

    this.setPlaylistMode = this.setPlaylistMode.bind(this);
    this.setPlaylistName = this.setPlaylistName.bind(this);
    this.selectNewPhoto = this.selectNewPhoto.bind(this);
  }

  componentWillUnmount() {
    const {updatePlaylists} = this.props;
    updatePlaylists({newPlaylist: initialState.newPlaylist});
  }

  setPlaylistMode = mode => () => {
    const {updatePlaylists} = this.props;
    updatePlaylists({newPlaylist: {mode}});
  }

  setPlaylistName(name) {
    const {updatePlaylists} = this.props;
    updatePlaylists({newPlaylist: {name}});
  }

  async selectNewPhoto() {
    const {updatePlaylists} = this.props;
    const image = await selectPhoto('Select Playlist Photo', true);

    if (image !== 'cancelled') {
      updatePlaylists(
        {
          newPlaylist: {
            image: {
              path: image.path,
              base64: image.data,
            },
          },
        },
      );
    }
  }

  render() {
    const {playlists: {newPlaylist: {name, mode, image}}} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.nav}>
            <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            <Text style={styles.title}>New Playlist</Text>
            {(
              (typeof name === 'string' && name !== '')
              && (typeof mode === 'string' && mode !== '')
              && (image && typeof image.base64 === 'string')
            ) &&
              <TouchableOpacity style={styles.rightIcon} onPress={Actions.libAddMembers}>
                <Text style={[styles.rightIconText, styles.enabledText]}>next</Text>
              </TouchableOpacity>
            }
            {(!name || name === '' || !mode || mode === '' || !image.base64) &&
              <TouchableOpacity style={styles.rightIcon} disabled={true}>
                <Text style={[styles.rightIconText, styles.disabledText]}>next</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
        <View style={styles.wrap}>
          <View style={styles.imageName}>
            <TouchableOpacity style={styles.photoButton} onPress={this.selectNewPhoto}>
              <View style={styles.roundPhotoWrap}>
                {image && image.path && image.path !== 'cancelled' &&
                  <FastImage
                    style={styles.roundPhoto}
                    source={{uri: `data:image/png;base64,${image.base64}`}}
                  />
                }
                <View style={styles.roundPhotoFilter}>
                  {image && image.path && <MaterialIcons name='edit' style={styles.imageIcon} />}
                  {image && !image.path && <FontAwesome name='camera' style={styles.imageIcon} />}
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.name}>
              <TextInput
                style={styles.input}
                onChangeText={this.setPlaylistName}
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
              styles.mode,
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
              style={styles.modeWrap}
              onPress={this.setPlaylistMode('hidden')}
            >
              <Octicons
                name='telescope'
                color={mode === 'hidden' ? '#2b6dc0' : '#888'}
                style={styles.modeIcon}
              />
              <View style={styles.modeInfo}>
                <View style={styles.modeName}>
                  <Text style={styles.modeNameText}>Hidden</Text>
                </View>
                <View style={styles.modeDesc}>
                  <View style={styles.descBullet}>
                    <Text style={styles.bulletText}>•</Text>
                    <Text style={styles.descText}>Hidden from public</Text>
                  </View>
                  <View style={styles.descBullet}>
                    <Text style={styles.bulletText}>•</Text>
                    <Text style={styles.descText}>Invite-only</Text>
                  </View>
                  <View style={styles.descBullet}>
                    <Text style={styles.bulletText}>•</Text>
                    <Text style={styles.descText}>Members may only add tracks</Text>
                  </View>
                </View>
              </View>
              {mode === 'hidden' &&
                <Ionicons
                  name='md-radio-button-on'
                  color='#2b6dc0'
                  style={styles.modeSelect}
                />
              }
              {mode !== 'hidden' &&
                <Ionicons
                  name='md-radio-button-off'
                  color='#fefefe'
                  style={styles.modeSelect}
                />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.mode}>
            <TouchableOpacity
              style={styles.modeWrap}
              onPress={this.setPlaylistMode('vip')}
            >
              <Foundation
                name='ticket'
                color={mode === 'vip' ? '#2b6dc0' : '#888'}
                style={styles.modeIcon}
              />
              <View style={styles.modeInfo}>
                <View style={styles.modeName}>
                  <Text style={styles.modeNameText}>VIP</Text>
                </View>
                <View style={styles.modeDesc}>
                  <View style={styles.descBullet}>
                    <Text style={styles.bulletText}>•</Text>
                    <Text style={styles.descText}>Public</Text>
                  </View>
                  <View style={styles.descBullet}>
                    <Text style={styles.bulletText}>•</Text>
                    <Text style={styles.descText}>Request / invite to join</Text>
                  </View>
                  <View style={styles.descBullet}>
                    <Text style={styles.bulletText}>•</Text>
                    <Text style={styles.descText}>Members may only add tracks</Text>
                  </View>
                </View>
              </View>
              {mode === 'vip' &&
                <Ionicons name='md-radio-button-on' color='#2b6dc0' style={styles.modeSelect} />
              }
              {mode !== 'vip' &&
                <Ionicons name='md-radio-button-off' color='#fefefe' style={styles.modeSelect} />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.mode}>
            <TouchableOpacity
              style={styles.modeWrap}
              onPress={this.setPlaylistMode('limitless')}
            >
              <MaterialIcons
                name='all-inclusive'
                color={mode === 'limitless' ? '#2b6dc0' : '#888'}
                style={styles.modeIcon}
              />
              <View style={styles.modeInfo}>
                <View style={styles.modeName}>
                  <Text style={styles.modeNameText}>Limitless</Text>
                </View>
                <View style={styles.modeDesc}>
                  <View style={styles.descBullet}>
                    <Text style={styles.bulletText}>•</Text>
                    <Text style={styles.descText}>Public</Text>
                  </View>
                  <View style={styles.descBullet}>
                    <Text style={styles.bulletText}>•</Text>
                    <Text style={styles.descText}>Anyone may join</Text>
                  </View>
                  <View style={styles.descBullet}>
                    <Text style={styles.bulletText}>•</Text>
                    <Text style={styles.descText}>
                      Members may add and delete tracks
                    </Text>
                  </View>
                </View>
              </View>
              {mode === 'limitless' &&
                <Ionicons
                  name='md-radio-button-on'
                  color='#2b6dc0'
                  style={styles.modeSelect}
                />
              }
              {mode !== 'limitless' &&
                <Ionicons
                  name='md-radio-button-off'
                  color='#fefefe'
                  style={styles.modeSelect}
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
  playlists: PropTypes.object.isRequired,
  updatePlaylists: PropTypes.func.isRequired,
};

function mapStateToProps({playlists}) {
  return {playlists};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updatePlaylists}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlaylistNameView);