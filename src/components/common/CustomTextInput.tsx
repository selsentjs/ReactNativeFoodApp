import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomTextInput = ({
  mt,
  placeholder,
  onChangeText,
  isValid,
  keyboardType,
  value,
  icon,
  secureTextEntry,
}) => {
  return (
    <View
      style={[
        styles.container,
        {marginTop: mt ? mt : 20, borderColor: isValid ? '#9e9e9e' : 'red'},
      ]}>
      {icon && (
        <Image
          source={icon}
          style={{width: 24, height: 24, tintColor: '#7d7b7b'}}
        />
      )}
      <TextInput
        style={{marginLeft: 20, width: '80%'}}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ? keyboardType : 'default'}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    borderWidth: 1,

    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
});
