import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  emptyCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slice/CartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
// razorpay
import RazorpayCheckout from 'react-native-razorpay';
import {orderItem} from '../redux/slice/OrderSlice';

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  qty: number;
}

const Checkout = () => {
  const addresses = useSelector(state => state.address.data);

  const [selectedMethod, setSelectedMethod] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(
    'Please select the address',
  );

  const navigation = useNavigation();
  // useSelector
  const cart: CartItem[] = useSelector(
    (state: {cart: {data: CartItem[]}}) => state.cart.data,
  );
  //console.log('cart:', cart);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // get total for single item
  const getTotalForSingleItem = (item: any) => {
    return item.price * item.qty;
  };
  // get total for all the items
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  // get address from localStorage

  const getAddress = async () => {
    const storedAddress = await AsyncStorage.getItem('MY_ADDRESS');
    setSelectedAddress(storedAddress ?? 'No address selected');
  };

  useEffect(() => {
    getAddress();
  }, [isFocused]);

  // order
  const orderPlace = (paymentId: any) => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    let display_AM_PM = '';
    if (hours > 12) {
      display_AM_PM = 'pm';
    } else {
      display_AM_PM = 'am';
    }
    console.log(month);

    // Generate unique orderId using timestamp
    const orderId = `${year}${month}${day}${hours}${minutes}`;

    const data = {
      items: cart,
      amount: '₹' + getTotal(),
      address: selectedAddress,
      paymentId: paymentId,
      paymentStatus: selectedMethod === 3 ? 'Pending' : 'Success', // selectedMethod 3 is Cash on Delivery
      createdAt:
        day +
        '/' +
        month +
        '/' +
        year +
        ' ' +
        hours +
        ': ' +
        minutes +
        display_AM_PM,
    };
    dispatch(orderItem({orderId, orderData: data}));
    //dispatch(orderItem(data));
    dispatch(emptyCart([])); // after paid money cart should be empty
    navigation.navigate('OrderSuccess' as never);
  };

  // razor payment
  const paymentDetails = () => {
    var options = {
      description: 'Credits towards consultation',
      image:
        'https://img.freepik.com/free-vector/hand-drawn-healthy-food-logo-template_23-2149653126.jpg?w=740&t=st=1713778951~exp=1713779551~hmac=2b2d645f24cbb28a39dea7ce7eb154d68812fc6e4302531c4df2bbddb2e8b6f7',
      currency: 'INR',
      key: 'rzp_test_Hto9Ywm2LmMFdb',
      amount: getTotal() * 100,
      name: 'My Food App',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: {color: '#9b7b09'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        //Alert.alert(`Success: ${data.razorpay_payment_id}`);
        orderPlace(data.razorpay_payment_id);
        dispatch(emptyCart([])); // after payment, clear the cart
      })
      .catch(error => {
        // handle failure
        console.log('Error:', error); // Log the error details for debugging
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View>
      <ScrollView>
        <Header
          title={'Checkout'}
          leftIcon={require('../assets/back-arrow.png')}
          rightIcon={require('../assets/shopping-bag.png')}
          onClickLeftIcon={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.title}>Added Items</Text>

        <FlatList
          data={cart}
          renderItem={({item}) => {
            return (
              <View style={styles.imageContainer} key={item.id}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.touchableContainer}>
                  <Image source={{uri: item.image}} style={styles.image} />

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
                        <Text style={styles.operator}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.qty}</Text>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => dispatch(addItemToCart(item))}>
                        <Text style={styles.operator}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.singleItemTotal}>
                      Total : ₹ {getTotalForSingleItem(item)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        {cart.length === 0 && (
          <View style={styles.noItems}>
            <Text style={{color: 'green', fontSize: 22}}>No Item added</Text>
          </View>
        )}
        <View style={styles.totalView}>
          <Text style={styles.title}>Total</Text>
          <Text style={[styles.title, {color: 'green', fontWeight: '600'}]}>
            ₹ {getTotal()}
          </Text>
        </View>
        <Text style={styles.title}>Select Payment Mode</Text>
        <TouchableOpacity
          style={styles.paymentMethod}
          onPress={() => {
            setSelectedMethod(0);
          }}>
          {selectedMethod === 0 ? (
            <Ionicons
              name="radio-button-on"
              size={24}
              color={selectedMethod === 0 ? 'green' : 'black'}
            />
          ) : (
            <Ionicons name="radio-button-off" size={24} color={'black'} />
          )}
          <Text style={styles.paymentMethodText}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethod}
          onPress={() => {
            setSelectedMethod(1);
          }}>
          {selectedMethod === 1 ? (
            <Ionicons
              name="radio-button-on"
              size={24}
              color={selectedMethod === 1 ? 'green' : 'black'}
            />
          ) : (
            <Ionicons name="radio-button-off" size={24} color={'black'} />
          )}
          <Text style={styles.paymentMethodText}>Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethod}
          onPress={() => {
            setSelectedMethod(2);
          }}>
          {selectedMethod === 2 ? (
            <Ionicons
              name="radio-button-on"
              size={24}
              color={selectedMethod === 2 ? 'green' : 'black'}
            />
          ) : (
            <Ionicons name="radio-button-off" size={24} color={'black'} />
          )}
          <Text style={styles.paymentMethodText}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethod}
          onPress={() => {
            setSelectedMethod(3);
          }}>
          {selectedMethod === 3 ? (
            <Ionicons
              name="radio-button-on"
              size={24}
              color={selectedMethod === 3 ? 'green' : 'black'}
            />
          ) : (
            <Ionicons name="radio-button-off" size={24} color={'black'} />
          )}
          <Text style={styles.paymentMethodText}>Cash on Delivery</Text>
        </TouchableOpacity>
        <View style={styles.addressContainer}>
          <Text style={styles.title}>Address</Text>

          <Text
            style={[
              styles.title,
              {color: 'blue', textDecorationLine: 'underline'},
            ]}
            onPress={() => {
              navigation.navigate('Addresses' as never);
            }}>
            Edit address
          </Text>
        </View>
        <Text
          style={[
            styles.title,
            {marginTop: 10, fontSize: 17, color: '#494949'},
          ]}>
          {selectedAddress}
        </Text>
        <Button
          bg={'brown'}
          title={'Pay & Order'}
          color={'#fff'}
          onClick={() => {
            paymentDetails();
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  imageContainer: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: 400,
    height: 100,
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
    width: 70,
    height: 70,
    borderRadius: 10,
    marginLeft: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    // marginTop: 10,
  },

  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  btn: {
    padding: 5,
    width: 25,
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
  singleItemTotal: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 5,
    color: 'green',
  },
  qtyText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 13,
  },
  operator: {
    fontSize: 20,
    fontWeight: '600',
  },
  totalView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 0.3,
    height: 70,
    borderBottomColor: '#000000',
  },
  paymentMethod: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    paddingLeft: 20,
  },

  paymentMethodText: {
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },
  addressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingRight: 20,
  },
});
