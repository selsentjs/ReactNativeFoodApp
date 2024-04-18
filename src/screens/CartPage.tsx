import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/common/Header';
import {useNavigation} from '@react-navigation/native';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slice/CartSlice';
import CheckoutLayout from '../components/common/CheckoutLayout';

const CartPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart.data);
  //console.log('cart:', cart);
  // handle image by id
  const handleImagePress = async item => {
    navigation.navigate('RecipeDetail', {item});
  };

  // get total for single item
  const getTotalForSingleItem = item => {
    return item.price * item.qty;
  };

  // get total for all the items
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={'Cart Items'}
        leftIcon={require('../assets/back-arrow.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <View style={{flex: 1}}>
        <ScrollView>
          <FlatList
            data={cart}
            renderItem={({item}) => {
              return (
                <View style={styles.imageContainer} key={item.id}>
                  <TouchableOpacity
                    onPress={() => handleImagePress({...item})}
                    style={styles.touchableContainer}>
                    {item.image && ( // Check if item.image is not null or undefined
                      <Image source={{uri: item.image}} style={styles.image} />
                    )}
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>
                        {item.title.length > 15
                          ? item.title.substring(0, 15) + '...'
                          : item.title}
                      </Text>
                      <View style={styles.qtyView}>
                        <Text style={styles.priceText}> ₹ {item.price}</Text>
                        {/* // increase and decrease the quantity by cartSlice */}
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() => {
                            if (item.qty > 1) {
                              dispatch(reduceItemFromCart(item)); // If quantity is more than 1, reduce it
                            } else {
                              dispatch(removeItemFromCart(item)); // If quantity is 1, remove it from the cart
                            }
                          }}>
                          <Text style={{fontSize: 20, fontWeight: '600'}}>
                            -
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '600',
                            marginLeft: 13,
                          }}>
                          {item.qty}
                        </Text>
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() => dispatch(addItemToCart(item))}>
                          <Text style={{fontSize: 20, fontWeight: '600'}}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          marginTop: 15,
                          color: 'green',
                        }}>
                        Total : ₹ {getTotalForSingleItem(item)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
      {/* checkout details */}
      {cart.length > 0 && (
        <CheckoutLayout items={cart.length} total={getTotal()} />
      )}

      {cart.length === 0 && (
        <View style={styles.noItems}>
          <Text>No Items in cart</Text>
        </View>
      )}
    </View>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: 400,
    height: 180,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    marginVertical: 10,
    width: 170,
    height: 150,
    borderRadius: 10,
    marginLeft: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginTop: 10,
  },
  noData: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 40,
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  btn: {
    padding: 5,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 20,
  },
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
