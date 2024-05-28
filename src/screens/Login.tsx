import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.loginContainer}>
      <Text>Login</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register'); // Navigate to BottomTabs
        }}>
        <Text>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BottomTabs'); // Navigate to BottomTabs
        }}>
        <Text>Login</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
