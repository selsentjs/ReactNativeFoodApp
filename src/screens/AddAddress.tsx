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
import {addAddress} from '../redux/slice/AddressSlice';
import uuid from 'react-native-uuid';

const AddAddress = () => {
  const navigation = useNavigation();
  const [type, setType] = useState(0);
  // input box states
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [pinCode, setPincode] = useState('');

  // dispatch
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <Header
        title={'Add New Address'}
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
        onClick={() => {
          () => {
            dispatch(
              addAddress({
                state: state,
                city: city,
                pinCode: pinCode,
                type: type === 1 ? 'Home' : 'Office',
                id: uuid.v4(),
              }),
              navigation.goBack(),
            );
          };
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
