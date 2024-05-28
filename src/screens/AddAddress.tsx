import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import React, {useState} from 'react';
import Header from '../components/common/Header';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/common/Button';
import {useDispatch} from 'react-redux';
import {addAddress, updateAddress} from '../redux/slice/AddressSlice';
import uuid from 'react-native-uuid';

const AddAddress = props => {
  // to get the address id
  const item = props.route.params;

  const navigation = useNavigation();

  // input box states - when you edit the data, it will get all the existing data
  const [type, setType] = useState(
    item.type === 'edit' ? (item.data.type === 'Home' ? 0 : 1) : 0,
  );

  const [state, setState] = useState(
    item.type === 'edit' ? item.data.state : '',
  );
  const [city, setCity] = useState(item.type === 'edit' ? item.data.city : '');
  const [street, setStreet] = useState(
    item.type === 'edit' ? item.data.street : '',
  );
  const [pinCode, setPincode] = useState(
    item.type === 'edit' ? item.data.pinCode : '',
  );

  // dispatch
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <Header
        title={item.type === 'edit' ? 'Edit Address' : 'Add New Address'}
        leftIcon={require('../assets/back-arrow.png')}
        rightIcon={require('../assets/shopping-bag.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <TextInput
        style={[styles.input, {marginTop: 50}]}
        placeholder="Enter State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={[styles.input, {marginTop: 15}]}
        placeholder="Enter City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={[styles.input, {marginTop: 15}]}
        placeholder="Enter Street"
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        style={[styles.input, {marginTop: 15}]}
        placeholder="Enter Pincode"
        keyboardType="number-pad"
        value={pinCode}
        onChangeText={setPincode}
      />
      <View style={styles.selectionView}>
        <TouchableOpacity
          style={[
            styles.btn,
            {borderWidth: 1, borderColor: type === 0 ? 'orange' : 'black'},
          ]}
          onPress={() => {
            setType(0);
          }}>
          {type === 0 ? (
            <Ionicons name="radio-button-on" size={24} color={'green'} />
          ) : (
            <Ionicons name="radio-button-off" size={24} color={'black'} />
          )}
          <Text style={styles.iconText}>{'Home'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            {borderWidth: 1, borderColor: type === 1 ? 'orange' : 'black'},
          ]}
          onPress={() => {
            setType(1);
          }}>
          {type === 1 ? (
            <Ionicons name="radio-button-on" size={24} color={'green'} />
          ) : (
            <Ionicons name="radio-button-off" size={24} color={'black'} />
          )}
          <Text style={styles.iconText}>{'Office'}</Text>
        </TouchableOpacity>
      </View>
      <Button
        bg={'brown'}
        title={'Save Address'}
        color={'#fff'}
        // edited address should save or new address should save 
        onClick={() => {
          if (item.type === 'edit') {
            dispatch(
              updateAddress({
                state: state,
                city: city,
                street: street,
                pinCode: pinCode,
                type: type === 0 ? 'Home' : 'Office',
                id: item.data.id,
              }),
              navigation.goBack(),
            );
          } else {
            dispatch(
              addAddress({
                state: state,
                city: city,
                street: street,
                pinCode: pinCode,
                type: type === 0 ? 'Home' : 'Office',
                id: uuid.v4(),
              }),
              navigation.goBack(),
            );
          }
        }}
      />
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  selectionView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 10,
  },
});
