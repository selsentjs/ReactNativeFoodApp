import {StyleSheet, View} from 'react-native';
import React from 'react';
import BottomTab from './src/navigation/BottomTab';
import {Provider} from 'react-redux';

import {store} from './src/redux/store/store';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';

let persistor = persistStore(store);

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BottomTab />
        </PersistGate>
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
