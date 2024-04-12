import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HorizontalImage from '../components/HorizontalImage';


const HomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity>
          <Ionicons name="menu" size={30} color={'black'} style={styles.icon} />
        </TouchableOpacity>

        <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
          Welcome Selva!
        </Text>
        <Ionicons
          name="person-circle-outline"
          size={50}
          color={'black'}
          style={styles.userIcon}
        />
      </View>
      <HorizontalImage />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  icon: {
    padding: 12,
  },
  userIcon: {
    color: 'blue',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 7,
  },
});
