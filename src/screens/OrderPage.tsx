import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/common/Header';
import axios from 'axios';
import {BASE_URL, ORDER} from '../utils/URL';
import {orderItem, setOrderData} from '../redux/slice/OrderSlice';
import Button from '../components/common/Button';

const OrderPage = () => {
  const order = useSelector(state => state.order.data);
  console.log('order:', order);
  const userId = useSelector(state => state.auth.data);
  console.log('user:', userId);
  const items = useSelector(state => state.cart.data);
  console.log('cart:', items);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (order.length > 0 && userId && items.length > 0) {
      console.log('order:', JSON.stringify(order, null, 2));
    }
  }, [order, items, userId]);

  const fetchOrderData = async () => {
    try {
      console.log(`Fetching order data for user: ${userId}`);
      const response = await axios.get(`${BASE_URL}${ORDER}?userId=${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Fetched order data:', response.data.orders);
      dispatch(setOrderData(response.data.orders));
    } catch (error) {
      console.error('Error fetching order data from API:', error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrderData();
    }
  }, [userId]);

  useEffect(() => {
    console.log('Updated order data in state:', order);
  }, [order]);

  const postOrderDetailsToAPI = async orderData => {
    try {
      console.log(
        'Posting order data to API:',
        JSON.stringify(orderData, null, 2),
      );

      // Convert createdAt to a string in ISO format
      //orderData.createdAt = new Date(orderData.createdAt).toISOString();

      const response = await axios.post(`${BASE_URL}${ORDER}`, orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response from API:', response.data.order);
      dispatch(orderItem({orderId: orderData.orderId, orderData}));
    } catch (error) {
      console.error('Error posting order details to API:', error.message);
      console.error('Error details:', error.response?.data);
    }
  };

  useEffect(() => {
    const postOrderData = async () => {
      if (Array.isArray(order) && order.length > 0) {
        for (const singleOrder of order) {
          const {orderId, paymentId, paymentStatus, amount, address, items} =
            singleOrder;
          const orderData = {
            orderId,
            paymentId,
            paymentStatus,
            amount,
            address,
            items,
            userId: userId._id,
          };
          await postOrderDetailsToAPI(orderData);
        }
      }
    };
    if (userId) {
      postOrderData();
    }
  }, [order, userId]);

  if (order.length === 0) {
    return <Text style={styles.noData}>No Food in your order</Text>;
  }

  const renderOrderItem = ({item}) => (
    <View style={styles.orderWrapper}>
      <View style={styles.orderDetailsContainer}>
        <Text>OrderId: {item.orderId}</Text>
        <Text>{item.createdAt}</Text>
      </View>
      <View style={styles.orderItem}>
        {item.items && item.items.length > 0 ? (
          <FlatList
            data={item.items}
            keyExtractor={productItem => productItem._id}
            renderItem={({item: productItem}) => (
              <View style={styles.productItem}>
                <Image
                  source={{uri: productItem.image}}
                  style={styles.itemImage}
                />
                <View style={styles.nameView}>
                  <Text style={styles.itemTitle}>
                    {productItem.title.length > 20
                      ? productItem.title.substring(0, 20) + '...'
                      : productItem.title}
                  </Text>
                  <Text style={styles.itemPrice}>
                    {'₹ ' + productItem.price}
                  </Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noData}>No items in this order</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.orderContainer}>
      <Header
        leftIcon={require('../assets/back-arrow.png')}
        title={'Orders'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={order}
        keyExtractor={item => item._id}
        renderItem={renderOrderItem}
      />
    </View>
  );
};

export default OrderPage;

const styles = StyleSheet.create({
  orderContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderWrapper: {
    marginBottom: 20,
  },
  orderItem: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
    borderColor: '#7D7D7DF2',
  },
  productItem: {
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  nameView: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  itemPrice: {
    color: 'green',
    fontSize: 18,
  },
  orderDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 5,
    marginTop: 10,
  },
  noData: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 40,
  },
  removeText: {
    color: 'red',
    fontSize: 16,
  },
  refreshText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    padding: 20,
  },
});
