import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const OrderSuccess = () => {
  const navigation = useNavigation();
  const order = useSelector(state => state.order);

  return (
    <View style={styles.orderContainer}>
      <Image source={require('../assets/check.png')} style={styles.icon} />
      <Text style={styles.message}>Order Placed Successfully...</Text>
      <Text
        style={styles.btn}
        onPress={() => {
          navigation.navigate('HomePage');
        }}>
        Go To Home
      </Text>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  orderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
  btn: {
    padding: 10,
    borderWidth: 1,
    color: '#000',
    marginTop: 20,
  },
});
