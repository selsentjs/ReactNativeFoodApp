import {
  Image,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {BASE_URL, UPLOAD_IMAGE} from '../utils/URL';
import {useNavigation} from '@react-navigation/native';

const User = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth.data);
  //console.log('authData:', authData);

  const [imageData, setImageData] = useState(null);
  const [imagePicked, setImagePicked] = useState(false);

  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    if (result.didCancel) return;
    setImageData(result);
    setImagePicked(true);
    console.log('result:', result);
  };
  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) return;
    setImageData(result);
    setImagePicked(true);
    console.log('result:', result);
  };

  const saveProfilePicture = async () => {
    if (imageData && authData && authData.token) {
      const {uri, type, fileName} = imageData.assets[0];
      const formData = new FormData();
      console.log('formData:', formData);
      formData.append('profilePic', {
        uri,
        type,
        name: fileName,
      });

      try {
        const response = await axios.post(BASE_URL + UPLOAD_IMAGE, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authData.token}`,
          },
        });
        console.log('image_post_res:', response);
        console.log('Profile picture updated:', response.data);
        Alert.alert('Profile picture updated successfully!');
      } catch (error) {
        console.error('Error updating profile picture:', error);
        Alert.alert('Error updating profile picture. Please try again.');
      }
    } else {
      Alert.alert('No image selected or user not authenticated.');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.profileContainer}>
        <Text style={styles.heading}>Profile</Text>
      </View>
      <TouchableOpacity style={styles.profilePic}>
        {imageData !== null ? (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={{width: 100, height: 100, borderRadius: 20}}
          />
        ) : (
          <Image source={require('../assets/profile.png')} style={styles.img} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editPicContainer}
        onPress={() => {
          if (!imagePicked) {
            openGallery();
            setImagePicked(true);
          } else {
            saveProfilePicture();
          }
        }}>
        <Text style={{color: 'green'}}>
          {imagePicked === true ? 'Save Picture' : 'Edit Picture'}
        </Text>
      </TouchableOpacity>
      <View style={styles.userDetailContainer}>
        <Text style={{fontSize: 25, color: '#6c0474'}}>{authData.name}</Text>
      </View>
      {/* // personal information */}
      <View style={styles.personalInfoContainer}>
        <Text style={{fontSize: 15, color: '#190570'}}>
          Personal Information
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProfile', {userData: authData});
          }}>
          <Text style={{fontSize: 15, color: '#870404'}}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/cemail.png')}
          style={styles.personImg}
        />
        <Text> {authData.email}</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/cmobile.png')}
          style={styles.personImg}
        />
        <Text> {authData.mobile}</Text>
      </View>

      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/crole.png')}
          style={styles.personImg}
        />
        <Text>{authData.role}</Text>
      </View>

      <TouchableOpacity
        style={styles.editPicContainer}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={{fontSize: 20}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  profileContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#232323',
    alignItems: 'center',
  },
  heading: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '600',
  },
  profilePic: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  editPicContainer: {
    width: 200,
    height: 50,
    borderWidth: 0.2,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    borderColor: 'black',
    justifyContent: 'center',
  },
  userDetailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  personalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  imgContainer: {
    width: '100%',
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: '#232323',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  personImg: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});
