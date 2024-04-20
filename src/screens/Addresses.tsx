import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../components/common/Header';
import {useNavigation} from '@react-navigation/native';

const Addresses = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Header
        title={'Address'}
        leftIcon={require('../assets/back-arrow.png')}
        rightIcon={require('../assets/shopping-bag.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.navigate('AddAddress' as never);
        }}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  addBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#f4ca11',
    borderRadius: 25,
    position: 'absolute',
    right: 20,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    color: '#ffffff',
    fontSize: 30,
  },
});
