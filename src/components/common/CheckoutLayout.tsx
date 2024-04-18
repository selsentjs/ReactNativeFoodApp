import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CheckoutLayout = ({total, items}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.checkoutContainer}>
      <View style={styles.tab}>
        <Text style={{color: 'black', fontSize: 20}}>{`(items ${items})`}</Text>
        <Text style={{color: 'red', fontSize: 20}}>
          {'Total :  ₹ ' + total}
        </Text>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Checkout')}>
          <Text style={{color: 'white', fontSize: 20}}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutLayout;

const styles = StyleSheet.create({
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: Dimensions.get('window').width,
    backgroundColor: '#e6e6fa',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutBtn: {
    width: '80%',
    height: '60%',
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
