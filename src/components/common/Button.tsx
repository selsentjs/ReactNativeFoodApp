import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

interface buttonProps {
  bg: any;
  title: string;
  onClick: () => void;
  color: any;
}
const Button = ({bg, title, onClick, color}: buttonProps) => {
  return (
    <TouchableOpacity
      // activeOpacity={1}
      style={[styles.btn, {backgroundColor: bg}]}
      onPress={onClick}>
      <Text style={[styles.text, {color: color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: Dimensions.get('window').width - 40,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
