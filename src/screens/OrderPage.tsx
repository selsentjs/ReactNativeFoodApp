import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/common/Header';
import {removeOrder, fetchOrderData} from '../redux/slice/OrderSlice';

const OrderPage = () => {
  const order = useSelector(state => state.order.data);
  console.log('order:', order);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [orderPosted, setOrderPosted] = useState(false); // State to track if order has been posted

  // Fetch order data when the component mounts
  useEffect(() => {
    dispatch(fetchOrderData());
  }, [dispatch]);

  // Function to post order details to API
  const postOrderDetailsToAPI = async orderDetails => {
    try {
      const response = await fetch(
        'http://192.168.1.6:3000/api/v1/orderDetails',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        },
      );

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(
          responseData.message || 'Failed to post order details to API',
        );
      }

      console.log('Order details posted successfully');
    } catch (error) {
      console.error('Error posting order details to API:', error.message);
    }
  };

  // useEffect hook to post order details to API when order data changes
  useEffect(() => {
    const postOrderData = async () => {
      if (order && order.length > 0 && !orderPosted) {
        // Check if order exists and has not been posted
        await postOrderDetailsToAPI(order);
        setOrderPosted(true); // Set flag to indicate order has been posted
      }
    };

    postOrderData();
  }, [order, orderPosted]);

  if (!order || order.length === 0) {
    return <Text style={styles.noData}>No Food in your order</Text>;
  }

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
        keyExtractor={item => item.orderId}
        renderItem={({item, index}) => (
          <View style={styles.orderWrapper} key={index}>
            <View style={styles.orderDetailsContainer}>
              <Text>OrderId: {item.orderId}</Text>
              <Text>{item.createdAt}</Text>
            </View>
            <View style={styles.orderItem}>
              {item.items && item.items.length > 0 ? (
                <FlatList
                  data={item.items}
                  keyExtractor={productItem => productItem.id}
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
        )}
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
});
