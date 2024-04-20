import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

interface checkoutProps {
  total: number;
  items: number;
}
const CheckoutLayout = ({total, items}: checkoutProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.checkoutContainer}>
      <View style={styles.tab}>
        <Text style={styles.items}>{`(Total Items: ${items})`}</Text>
        <Text style={styles.total}>{'Grand Total :  ₹ ' + total}</Text>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Checkout' as never)}>
          <Text style={styles.checkoutText}>Checkout</Text>
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
    backgroundColor: '#d1d1ff',
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
  items: {
    color: 'black',
    fontSize: 20,
  },
  total: {color: 'red', fontSize: 20},
  checkoutText: {
    color: 'white',
    fontSize: 20,
  },
});
