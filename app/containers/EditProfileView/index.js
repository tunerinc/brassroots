'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {Text, TextInput, View, TouchableOpacity, Animated, InteractionManager} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import {Placeholder, PlaceholderMedia, Fade, PlaceholderLine} from 'rn-placeholder';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import isURL from '../../utils/isURL';
import styles from './styles';

// Components
import LoadingTrack from '../../components/LoadingTrack';
import TrackCard from '../../components/TrackCard';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Tracks Action Creators
import {changeFavoriteTrack} from '../../actions/tracks/ChangeFavoriteTrack';

// Users Action Creators
import {changeCoverPhoto} from '../../actions/users/ChangeCoverPhoto';
import {changeProfilePhoto} from '../../actions/users/ChangeProfilePhoto';
import {saveProfile} from '../../actions/users/SaveProfile';

const AnimatedScrollView = Animated.createAnimatedComponent(KeyboardAwareScrollView);
const HEADER_MAX_HEIGHT = 261;
const HEADER_MIN_HEIGHT = 65;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class EditProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      tempBio: '',
      tempLocation: '',
      tempWebsite: '',
      websiteValid: true,
    };

    this.handleChangePhoto = this.handleChangePhoto.bind(this);
    this.handleSetBio = this.handleSetBio.bind(this);
    this.handleSetLocation = this.handleSetLocation.bind(this);
    this.handleSetWebsite = this.handleSetWebsite.bind(this);
    this.handleSaveProfile = this.handleSaveProfile.bind(this);
  }

  componentDidMount() {
    const {
      entities: {users},
      users: {currentUserID},
    } = this.props;
    const {favoriteTrackID, bio, location, website} = users.byID[currentUserID];

    this.setState({
      tempBio: bio,
      tempLocation: location,
      tempWebsite: website,
    });
  }

  componentWillUnmount() {
    const {tempBio, tempLocation, tempWebsite} = this.state;
    const {
      entities: {users},
      users: {currentUserID},
    } = this.props;
    const {bio, location, website} = users.byID[currentUserID];

    if (tempBio !== bio || tempLocation !== location || tempWebsite !== website) {
      this.handleSaveProfile();
    }
  }

  navToLibrary = () => Actions.root({type: ActionConst.RESET});

  handleChangePhoto = type => () => {
    const {changeCoverPhoto, changeProfilePhoto, users: {currentUserID}} = this.props;

    if (type === 'cover') {
      changeCoverPhoto(currentUserID);
    } else {
      changeProfilePhoto(currentUserID);
      
    }
  }

  handleSetBio = tempBio => this.setState({tempBio});

  handleSetLocation = tempLocation => this.setState({tempLocation});

  handleSetWebsite = tempWebsite => this.setState({tempWebsite, websiteValid: isURL(tempWebsite)});

  handleSaveProfile() {
    const {tempBio, tempLocation, tempWebsite} = this.state;
    const {saveProfile, users: {currentUserID}} = this.props;

    saveProfile(
      {
        bio: tempBio,
        location: tempLocation,
        website: tempWebsite,
        id: currentUserID,
      },
    );
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const headerShadowOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 0.9],
      extrapolate: 'clamp'
    });
    const photosOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 4],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
    const photosOffset = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
      outputRange: [0, 0, 500],
      extrapolate: 'clamp'
    });
    const {
      inputHeight,
      tempBio,
      tempLocation,
      tempWebsite,
      websiteValid,
      scrollY: y,
    } = this.state;
    const {
      title,
      entities: {tracks, users},
      tracks: {fetching: trackFetch},
      users: {currentUserID, fetching: userFetch},
    } = this.props;
    const user = users.byID[currentUserID];
    const {email, displayName, birthdate, coverImage, profileImage, favoriteTrackID} = user;
    const track = tracks.allIDs.includes(favoriteTrackID) ? tracks.byID[favoriteTrackID] : null;
    const coverImageExists = typeof coverImage === 'string' && coverImage !== '';
    const profileImageExists = typeof profileImage === 'string' && profileImage !== '';

    return (
      <View style={styles.container}>
        <AnimatedScrollView
          style={styles.scrollContainer}
          keyboardDismissMode='interactive'
          scrollEventThrottle={20}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y}}}])}
        >
          <View style={styles.scrollWrap}>
            {track &&
              <View style={styles.favoriteWrapper}>
                <TrackCard
                  albumName={track.album.name}
                  type='favorite'
                  context={{displayName, id: track.album.id, name: track.album.name, type:'favorite'}}
                  editing={true}
                  image={track.album.small}
                  name={track.name}
                  showFavoriteIcon={true}
                  showSquareImage={true}
                  artists={track.artists.map(a => a.name).join(', ')}
                />
              </View>
            }
            {!track &&
              <View style={styles.favoriteWrapper}>
                <LoadingTrack type='favorite' />
              </View>
            }
            <View style={styles.displayName}>
              <Ionicons name='md-person' style={styles.profileLeftIcon} />
              <TextInput
                style={styles.input}
                editable={false}
                onChangeText={this.handleSetName}
                maxLength={15}
                value={displayName}
                autoCapitalize='none'
                returnKeyType='done'
                placeholder='display name'
                placeholderTextColor='#888'
              />
            </View>
            <View style={styles.bio}>
              <FontAwesome name='newspaper-o' style={styles.profileLeftIcon} />
              <TextInput
                style={styles.input}
                multiline={true}
                onChangeText={this.handleSetBio}
                value={tempBio}
                maxLength={100}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='bio'
                placeholderTextColor='#888'
                placeholderStyle={{fontWeight: '600'}}
              />
            </View>
            <View style={styles.location}>
              <Ionicons name='md-pin' size={35} style={styles.profileLeftIcon} />
              <TextInput
                style={styles.input}
                onChangeText={this.handleSetLocation}
                value={tempLocation}
                maxLength={30}
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='done'
                placeholder='location'
                placeholderTextColor='#888'
                placeholderStyle={{fontWeight: '600'}}
              />
            </View>
            <View style={styles.website}>
              <Entypo name='link' size={35} style={styles.profileLeftIcon} />
              <TextInput
                style={styles.input}
                onChangeText={this.handleSetWebsite}
                value={tempWebsite}
                maxLength={30}
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='done'
                placeholder='website'
                placeholderTextColor='#888'
                placeholderStyle={{fontWeight: '600'}}
              />
              {tempWebsite !== '' &&
                <View style={styles.profileRightIconWrap}>
                  {websiteValid &&
                    <Ionicons
                      name='md-checkmark'
                      size={30}
                      color='#2b6dc0'
                      style={{flex: 1, textAlign: 'right'}}
                    />
                  }
                  {!websiteValid &&
                    <Ionicons
                      name='md-close'
                      size={30}
                      color='#c0392b'
                      style={{flex: 1, textAlign: 'right'}}
                    />
                  }
                </View>
              }
            </View>
            <View style={styles.email}>
              <MaterialCommunityIcons name='email' size={35} style={styles.profileLeftIcon} />
              <TextInput
                style={styles.input}
                editable={false}
                value={email}
                autoCapitalize='none'
                autoCorrect={false}
              />
              <Ionicons name='md-lock' size={25} style={styles.profileRightIcon} />
            </View>
            <View style={styles.birthdate}>
              <FontAwesome name='birthday-cake' size={35} style={styles.profileLeftIcon} />
              <TextInput
                style={styles.input}
                editable={false}
                value={birthdate}
                autoCapitalize='none'
                autoCorrect={false}
              />
              <Ionicons name='md-lock' size={25} style={styles.profileRightIcon} />
            </View>
          </View>
        </AnimatedScrollView>
        <Animated.View
          style={[
            styles.animatedHeader,
            {height: headerHeight, shadowOpacity: headerShadowOpacity},
          ]}
        >
          {(typeof coverImage !== 'string' || coverImage === '') && <View></View>}
          {coverImageExists &&
            <Animated.View style={[styles.headerBackground, {height: headerHeight}]}>
              <Animated.Image
                blurRadius={80}
                source={{uri: coverImage}}
                style={[
                  styles.headerBackground,
                  {height: headerHeight},
                ]}
              />
              <Animated.View
                style={[
                  styles.headerFilter,
                  {height: headerHeight},
                ]}
              ></Animated.View>
            </Animated.View>
          }
          <View style={styles.nav}>
            {title !== 'Create Profile' &&
              <Ionicons name='ios-arrow-back' style={styles.leftIcon} onPress={Actions.pop} />
            }
            {title === 'Create Profile' && <View style={styles.leftIcon}></View>}
            {title !== 'Create Profile' && <Text style={styles.title}>Edit Profile</Text>}
            {title === 'Create Profile' &&
              <Text style={styles.title}>
                {title}
              </Text>
            }
            {title !== 'Create Profile' && <View style={{flex: 1}}></View>}
            {(
              title === 'Create Profile'
              && !userFetch.includes('cover')
              && !userFetch.includes('profile')
              && coverImageExists
              && profileImageExists
              && (
                (websiteValid && tempWebsite !== '')
                || tempWebsite === ''
              )
            ) &&
              <TouchableOpacity style={styles.rightIcon} onPress={this.navToLibrary}>
                <Text style={[styles.createText, styles.enabledText]}>create</Text>
              </TouchableOpacity>
            }
            {(
              title === 'Create Profile'
              && (
                (tempWebsite !== '' && !websiteValid)
                || userFetch.includes('cover')
                || userFetch.includes('profile')
                || !coverImageExists
                || !profileImageExists
              )
            ) &&
              <TouchableOpacity style={styles.rightIcon} disabled={true}>
                <Text style={[styles.createText, styles.disabledText]}>create</Text>
              </TouchableOpacity>
            }
          </View>
          <Animated.View style={[styles.photos, {opacity: photosOpacity, bottom: photosOffset}]}>
            <View style={styles.editProfilePhoto}>
              {(profileImageExists && !userFetch.includes('profile')) &&
                <TouchableOpacity
                  style={styles.photoButton}
                  onPress={this.handleChangePhoto('profile')}
                >
                  <View style={styles.roundPhotoWrap}>
                    <FastImage style={styles.roundPhoto} source={{uri: profileImage}} />
                    <View style={styles.roundPhotoFilter}>
                      <MaterialIcons name='edit' style={styles.editIcon} />
                    </View>
                  </View>
                </TouchableOpacity>
              }
              {(!profileImageExists || userFetch.includes('profile')) &&
                <Placeholder Animate={Fade}>
                  <View style={styles.placeholderWrap}>
                    <PlaceholderMedia isRound={true} style={styles.loadingImage} />
                  </View>
                </Placeholder>
              }
              <Text style={styles.editPhotoText}>profile photo</Text>
            </View>
            <View style={styles.editCoverPhoto}>
              {(coverImageExists && !userFetch.includes('cover')) &&
                <TouchableOpacity
                  style={styles.photoButton}
                  onPress={this.handleChangePhoto('cover')}
                >
                  <View style={styles.roundPhotoWrap}>
                    <FastImage style={styles.roundPhoto} source={{uri: coverImage}} />
                    <View style={styles.roundPhotoFilter}>
                      <MaterialIcons name='edit' style={styles.editIcon} />
                    </View>
                  </View>
                </TouchableOpacity>
              }
              {(!coverImageExists || userFetch.includes('cover')) &&
                <Placeholder Animate={Fade}>
                  <View style={styles.placeholderWrap}>
                    <PlaceholderMedia isRound={true} style={styles.loadingImage} />
                  </View>
                </Placeholder>
              }
              <Text style={styles.editPhotoText}>cover photo</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

EditProfileView.propTypes = {
  entities: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  changeCoverPhoto: PropTypes.func.isRequired,
  changeProfilePhoto: PropTypes.func.isRequired,
  onboarding: PropTypes.object.isRequired,
  saveProfile: PropTypes.func.isRequired,
  changeFavoriteTrack: PropTypes.func.isRequired,
};

function mapStateToProps({albums, artists, entities, onboarding, tracks, users}) {
  return {
    albums,
    artists,
    entities,
    onboarding,
    tracks,
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeCoverPhoto,
    changeFavoriteTrack,
    changeProfilePhoto,
    saveProfile,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileView);
