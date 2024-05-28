import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  // navigate to Login page after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);


  return (
    <View style={styles.imageContainer}>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: '40%',
    resizeMode: 'contain',
  },
});
