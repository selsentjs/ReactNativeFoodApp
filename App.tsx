import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BottomTab from './src/navigation/BottomTab';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <BottomTab />
      </Provider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
