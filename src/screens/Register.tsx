import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL, CHECK_EMAIL_EXIST, REGISTER_USER} from '../utils/URL';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import CustomTextInput from '../components/common/CustomTextInput';
import CustomDropdown from '../components/common/CustomDropdown';
import LinearGradient from 'react-native-linear-gradient';
import {BG_COLOR, THEME_COLOR, THEME_COLOR2} from '../utils/Colors';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  // error
  const [errorName, setErrorName] = useState('');
  const [errorMobile, setErrorMobile] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorRole, setErrorRole] = useState('');

  // loader
  const [loading, setLoading] = useState(false);

  // dropdown

  const data = [
    {label: 'parent', value: 'parent'},
    {label: 'student', value: 'student'},
  ];

  // ============= validation  ======================================================
  const validate = () => {
    let isValid = true; // Set default to true

    // name
    if (name === '') {
      setErrorName('please enter name');
      isValid = false;
    } else {
      setErrorName('');
    }

    // mobile
    if (mobile === '') {
      setErrorMobile('please enter mobile');
      isValid = false;
    } else if (mobile.length < 10) {
      setErrorMobile('mobile number should be at least 10 characters long');
      isValid = false;
    } else {
      setErrorMobile('');
    }

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

    // dropdown
    if (role === '') {
      setErrorRole('please select role'); // Change the error message
      isValid = false;
    } else {
      setErrorRole('');
    }

    return isValid;
  };

  const signUp = async () => {
    try {
      // Check if email exists
      const response = await axios.post(BASE_URL + CHECK_EMAIL_EXIST, {
        email: email,
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const json = response.data;
      setLoading(false);
      if (json.exists) {
        // Email already exists, show error message
        setErrorEmail('Email already exists');
        Alert.alert('Error', 'Email already exists');
      } else {
        // Email does not exist, proceed with signup
        console.log(
          'details:',
          name + ' ' + mobile + ' ' + email + ' ' + password + ' ' + role,
        );

        const registerResponse = await axios.post(
          BASE_URL + REGISTER_USER,
          {
            name: name,
            mobile: mobile,
            email: email,
            password: password,
            role: role,
          },
          {
            headers: {
              'Content-type': 'application/json',
            },
          },
        );

        console.log('res: ', registerResponse.data);
        if (registerResponse.data.token) {
          navigation.navigate('Login');
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('Fetch error:', error.message);
    }
  };
  //============================================================
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.registerContainer}>
          <View style={styles.registerTop}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Image
                source={require('../assets/back-arrow.png')}
                style={styles.backArrowImg}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>CREATE YOUR ACCOUNT</Text>
          </View>
          <View>
            <CustomTextInput
              icon={require('../assets/person.png')}
              placeholder={'Enter Name'}
              value={name}
              onChangeText={setName}
              isValid={errorName === '' ? true : false}
            />
            {errorName !== '' && (
              <Text style={styles.errorText}>{errorName}</Text>
            )}
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
              icon={require('../assets/mobile.png')}
              placeholder={'Enter Mobile'}
              value={mobile}
              onChangeText={setMobile}
              isValid={errorMobile === '' ? true : false}
              keyboardType={'number-pad'}
            />
            {errorMobile !== '' && (
              <Text style={styles.errorText}>{errorMobile}</Text>
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
            <CustomDropdown
              icon={require('../assets/parent-children.png')}
              data={data}
              placeholder="Select an item"
              search={true}
              maxHeight={300}
              labelField="label"
              valueField="value"
              onChange={value => setRole(value)}
              isValid={errorRole === '' ? true : false}
            />
            {errorRole !== '' && (
              <Text style={styles.errorText}>{errorRole}</Text>
            )}

            <LinearGradient
              style={styles.btn}
              colors={[THEME_COLOR, THEME_COLOR2]}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 0,
                  },
                ]}
                onPress={() => {
                  if (validate()) {
                    signUp();
                  }
                }}>
                <Text style={styles.btnText}>Sign Up</Text>
              </TouchableOpacity>
            </LinearGradient>
            <Text
              style={styles.signInText}
              onPress={() => navigation.navigate('Login')}>
              Already have Account? <Text style={styles.signIn}>Sign In </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  registerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    margin: 10,
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
  errorText: {
    color: 'red',
    marginLeft: 30,
    marginTop: 5,
  },
  signInText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 30,
    fontWeight: '500',
  },
  signIn: {
    color: THEME_COLOR,
    fontWeight: '700',
    marginLeft: 10,
  },
  backArrowImg: {
    backgroundColor: '#ffffff',
    borderRadius: 100,
    width: 40,
    height: 40,
  },
});
