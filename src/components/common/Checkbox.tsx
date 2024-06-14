import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Checkbox = ({
  terms_Conditions,
  setTerms_Conditions,
  errorTerms_Conditions,
  setErrorTerms_Conditions,
}) => {
  const handleCheckboxPress = () => {
    setTerms_Conditions(!terms_Conditions);
    setErrorTerms_Conditions('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.checkBox,
          terms_Conditions ? styles.activeCheckBox : null,
        ]}
        onPress={handleCheckboxPress}>
        <MaterialCommunityIcons
          name={
            terms_Conditions ? 'checkbox-outline' : 'checkbox-blank-outline'
          }
          size={30}
          color={terms_Conditions ? 'green' : 'black'}
        />
        <Text style={{marginLeft: 10, fontSize: 15, fontWeight: '500'}}>
          I accept all the <Text>Terms & Conditions</Text>
        </Text>
      </TouchableOpacity>
      {errorTerms_Conditions !== '' && (
        <Text style={styles.errorText}>{errorTerms_Conditions}</Text>
      )}
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {width: '100%'},
  checkBox: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  activeCheckBox: {
    backgroundColor: '#06b6d4' + '11',
  },
  errorText: {
    color: 'red',
    marginLeft: 30,
    marginTop: 5,
  },
});
