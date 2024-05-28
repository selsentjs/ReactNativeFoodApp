import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

interface HeaderProps {
  title: string;
  leftIcon: any;
  rightIcon: any;
  onClickLeftIcon?: () => void;
  onClickRightIcon?: () => void;
  isCart?: boolean;
}

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  isCart,
}: HeaderProps) => {
  // when we press the 'Add To Cart' button,
  // number should display in the cart (like how many items added that number)

  const cart = useSelector(state => state.cart.data);

  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.btn} onPress={onClickLeftIcon}>
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {!isCart && <View></View>}
      {isCart && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('CartPage' as never)}>
          <Image
            source={rightIcon}
            style={[styles.icon, {width: 40, height: 40}]}
          />
          {/* To display number of how many items added */}
          {cart.length > 0 && (
            <View style={styles.cartLengthTextContainer}>
              <Text style={styles.cartLengthText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    backgroundColor: '#4f85f0fa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  btn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  cartLengthTextContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartLengthText: {
    color: 'black',
    fontSize: 15,
  },
});
