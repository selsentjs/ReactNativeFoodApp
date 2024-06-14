import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/common/Header';
import axios from 'axios';
import {BASE_URL, ORDER} from '../utils/URL';
import {addOrder, removeOrder} from '../slices/orderSlice'; // Adjust the import path if necessary

const Order = () => {
  const order = useSelector(state => state.order.data);
  const user = useSelector(state => state.auth.data);
  const cart = useSelector(state => state.cart.data);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (order.length > 0 && user && cart) {
      postOrderDetails(order, user, cart);
    }
  }, [order, user, cart]);

  const postOrderDetails = async (order, user, cart) => {
    try {
      const response = await axios.post(BASE_URL + ORDER, {
        order,
        user,
        cart,
      });
      console.log('Order details posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting order details:', error);
    }
  };

  const handleRemoveOrder = itemId => {
    dispatch(removeOrder(itemId));
  };

  if (order.length === 0) {
    return <Text style={styles.noData}>No Food in your order</Text>;
  }

  const renderOrderItem = ({item}) => (
    <View style={styles.orderWrapper}>
      <View style={styles.orderDetailsContainer}>
        <Text>OrderId: {item.orderId}</Text>
        <Text>{item.createdAt}</Text>
        <TouchableOpacity onPress={() => handleRemoveOrder(item._id)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
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

export default Order;

const styles = StyleSheet.create({});
