import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAddress} from '../redux/slice/AddressSlice';

const Addresses = () => {
  const navigation = useNavigation();
  const address = useSelector(state => state.address.data);
  //console.log('address:', address);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log(address);
  }, [isFocused]);

  // store address in localStorage
  const defaultAddress = async item => {
    try {
      // Store address in AsyncStorage
      await AsyncStorage.setItem(
        'MY_ADDRESS',
        `${item.state}, ${item.city}, ${item.street}, ${item.pinCode}, ${item.type}`,
      );

      // Retrieve address from AsyncStorage
      const storedAddress = await AsyncStorage.getItem('MY_ADDRESS');
      console.log('Stored Address:', storedAddress);

      navigation.goBack();
    } catch (error) {
      console.error('Error storing address:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={'Address'}
        leftIcon={require('../assets/back-arrow.png')}
        rightIcon={require('../assets/shopping-bag.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={address}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                defaultAddress(item);
              }}>
              <View key={index} style={styles.addressView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'red'}}>State:</Text>
                  <View style={styles.addressText}>
                    <Text>{item.state}</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'red'}}>City:</Text>
                  <View style={styles.addressText}>
                    <Text>{item.city}</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'red'}}>Street:</Text>
                  <View style={styles.addressText}>
                    <Text>{item.street}</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'red'}}>PinCode:</Text>
                  <View style={styles.addressText}>
                    <Text>{item.pinCode}</Text>
                  </View>
                </View>

                {/* // display type right side */}
                <Text style={styles.type}>{item.type}</Text>

                {/* // edit and delete button */}
                <View style={styles.bottomBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AddAddress', {
                        type: 'edit',
                        data: item,
                      });
                    }}>
                    <Image
                      source={require('../assets/edit.png')}
                      style={styles.editBtn}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(deleteAddress(item.id));
                    }}>
                    <Image
                      source={require('../assets/delete.png')}
                      style={styles.deleteBtn}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.navigate('AddAddress', {type: 'new'});
        }}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  addBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#f4ca11',
    borderRadius: 25,
    position: 'absolute',
    right: 20,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    color: '#ffffff',
    fontSize: 30,
  },
  addressView: {
    width: '90%',
    height: 120,
    borderWidth: 0.5,
    alignSelf: 'center',
    padding: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  addressText: {
    marginLeft: 10,
    padding: 2,
  },
  type: {
    marginLeft: 10,
    padding: 5,
    position: 'absolute',
    right: 10,
    top: 20,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 10,
    fontSize: 15,
  },
  editBtn: {
    width: 26,
    height: 26,
  },
  deleteBtn: {
    width: 26,
    height: 26,
    tintColor: 'red',
    marginLeft: 10,
  },
  bottomBtn: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
  },
});
