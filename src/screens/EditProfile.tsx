import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../components/common/CustomTextInput';
import axios from 'axios';
import {BASE_URL, UPDATE_USER} from '../utils/URL';

const EditProfile = ({route}) => {
  const {userData} = route.params;

  const navigation = useNavigation();

  const [name, setName] = useState(userData.name);
  const [mobile, setMobile] = useState(userData.mobile);
  const [email, setEmail] = useState(userData.email);

  const saveProfile = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}${UPDATE_USER}/${userData._id}`,
        {
          name,
          email,
          mobile,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        },
      );
      //console.log('Response:', response);
      if (
        response.status === 200 &&
        response.data &&
        response.data.msg === 'user updated successfully'
      ) {
        Alert.alert('Profile updated successfully!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error updating profile. Please try again.');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 30,
        }}>
        <Text style={{fontSize: 20}}>Edit Profile</Text>
      </View>
      <View style={styles.borderContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  registerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  borderContainer: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  registerTop: {
    backgroundColor: '#42474D',
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    color: 'white',
  },

  text: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '600',
  },
  border: {
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  align: {
    marginVertical: 30,
  },
  btn: {
    width: '90%',
    height: 55,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },

  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
