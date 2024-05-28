import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';

import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/common/Header';

const OrderPage = () => {
  const order = useSelector(state => state.order.data);
  console.log('order:', order);
  const navigation = useNavigation();

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
        renderItem={({item}) => (
          <View style={styles.orderItem}>
            <View style={styles.orderDetailsContainer}>
              <Text>OrderId: {item.orderId}</Text>
              <Text>{item.createdAt}</Text>
            </View>
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
                    <Text style={{fontSize: 18, marginBottom: 5}}>
                      {productItem.title.length > 20
                        ? productItem.title.substring(0, 20)
                        : productItem.title}
                    </Text>
                    <Text style={{color: 'green', fontSize: 18}}>
                      {'₹ ' + productItem.price}
                    </Text>
                  </View>
                </View>
              )}
            />
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
  orderItem: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
    borderColor: '#7D7D7DF2',
  },
  productItem: {
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    marginTop: 5,
    borderRadius: 10,
  },
  nameView: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  orderDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 10,
  },
});
