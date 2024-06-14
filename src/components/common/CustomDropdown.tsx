import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({
  mt,
  placeholder,
  search,
  maxHeight,
  labelField,
  valueField,
  onChange,
  isValid,
  icon,
  data,
}) => {
  const [selectedValue, setSelectedValue] = useState({});

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
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={search}
        maxHeight={maxHeight}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={selectedValue}
        onChange={item => {
          setSelectedValue(item[valueField]);
          onChange(item[valueField]);
        }}
      />
    </View>
  );
};

export default CustomDropdown;

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
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: 250,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
