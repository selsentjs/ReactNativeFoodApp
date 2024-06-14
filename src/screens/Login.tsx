import {
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BG_COLOR, THEME_COLOR, THEME_COLOR2} from '../utils/Colors';
import CustomTextInput from '../components/common/CustomTextInput';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL, LOGIN_USER} from '../utils/URL';
import axios from 'axios';
import Checkbox from '../components/common/Checkbox';
import {setAuthData} from '../redux/slice/AuthSlice';
import {useDispatch} from 'react-redux';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms_Conditions, setTerms_Conditions] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorTerms_Conditions, setErrorTerms_Conditions] = useState('');

  // google sign in
  const handleGoogleSignIn = async () => {
    const isSignInSuccessful = true;

    if (isSignInSuccessful) {
      // Open the Google page in a browser when the image is pressed
      await Linking.openURL('https://www.gmail.com');
      navigation.navigate('BottomTabs'); // Navigate to home screen after successful sign-in
    }
  };

  // ============= validation  ======================================================
  const validate = () => {
    let isValid = true; // Set default to true
    // email
    if (email === '') {
      setErrorEmail('please enter email');
      isValid = false;
    } else if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setErrorEmail('please enter valid email');
      isValid = false;
    } else {
      setErrorEmail('');
    }

    // password
    if (password === '') {
      setErrorPassword('please enter password');
      isValid = false;
    } else if (password.length < 8) {
      setErrorPassword('please enter min 8 character password');
      isValid = false;
    } else {
      setErrorPassword('');
    }

    if (terms_Conditions === '') {
      setErrorTerms_Conditions('please accept terms & conditions');
      isValid = false;
    } else {
      setErrorTerms_Conditions('');
    }
    return isValid;
  };

  //========================================================================
  const registeredUser = async () => {
    console.log(email + ' ' + password + ' ' + terms_Conditions);

    try {
      const response = await axios.post(
        BASE_URL + LOGIN_USER,
        {
          email: email,
          password: password,
          terms_Conditions: terms_Conditions,
        },

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('res: ', response.data);

      if (response.data.token) {
        const user = response.data.user;
        dispatch(setAuthData(user));
        navigation.navigate('BottomTabs');
        setEmail('');
        setPassword('');
        setTerms_Conditions('')
      } else {
        if (response.data.error === 'Invalid credentials') {
          Alert.alert('Invalid email or password. Please try again.');
        } else {
          Alert.alert('An error occurred while logging in. Please try again.');
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert('An error occurred while logging in. Please try again.');
    }
  };

  //==================================================================================

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.loginContainer}>
          <Image
            source={require('../assets/logo1.png')}
            style={styles.loginImg}
          />

          <TouchableOpacity style={styles.border} onPress={handleGoogleSignIn}>
            <View style={styles.content}>
              <Image
                source={require('../assets/google.png')}
                style={styles.googleImg}
              />
              <Text style={styles.text}>SignIn with Google</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.signInContainer}>
            <CustomTextInput
              icon={require('../assets/email-outline.png')}
              placeholder={'Enter Email'}
              value={email}
              onChangeText={setEmail}
              isValid={errorEmail === '' ? true : false}
            />
            {errorEmail !== '' && (
              <Text style={styles.errorText}>{errorEmail}</Text>
            )}

            <CustomTextInput
              icon={require('../assets/password.png')}
              placeholder={'Enter Password'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              isValid={errorPassword === '' ? true : false}
            />
            {errorPassword !== '' && (
              <Text style={styles.errorText}>{errorPassword}</Text>
            )}
            <TouchableOpacity>
              <View style={{marginTop: 15, marginLeft: 10}}>
                <Text style={{color: 'green', fontSize: 15, fontWeight: '600'}}>
                  Forgot Password?
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{marginTop: 20}}>
              <Checkbox
                terms_Conditions={terms_Conditions}
                setTerms_Conditions={setTerms_Conditions}
                errorTerms_Conditions={errorTerms_Conditions}
                setErrorTerms_Conditions={setErrorTerms_Conditions}
              />
            </View>
            <LinearGradient
              style={styles.btnContainer}
              colors={[THEME_COLOR, THEME_COLOR2]}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  if (validate()) {
                    registeredUser();
                  }
                }}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </LinearGradient>

            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('Register')}>
              Create New Account? <Text style={styles.signUp}>Sign Up</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
  signInContainer: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: BG_COLOR,
  },
  loginImg: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  googleImg: {
    width: 45,
    height: 45,
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '600',
  },
  border: {
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    backgroundColor: BG_COLOR,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  align: {
    marginVertical: 30,
  },
  btnContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  btn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 35,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginLeft: 30,
    marginTop: 5,
  },
  signUpText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
    fontWeight: '500',
  },
  signUp: {
    color: THEME_COLOR,
    fontWeight: '700',
    marginLeft: 10,
  },
});
