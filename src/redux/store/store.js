import {configureStore} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import HorizontalReducer from '../slice/HorizontalFoodSlice';
import GridReducer from '../slice/GridFoodSlice';
import FavoriteFoodReducer from '../slice/FavoriteFoodSlice';
import CartReducer from '../slice/CartSlice';
import AddressReducer from '../slice/AddressSlice';
import OrderReducer from '../slice/OrderSlice';
import {combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define your custom middleware
const myMiddleware = storeAPI => next => action => {
  // console.log('Action:', action);
  return next(action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //debug: true,
};

const rootReducer = combineReducers({
  HorizontalFood: HorizontalReducer,
  GridFood: GridReducer,
  FavoriteFood: FavoriteFoodReducer,
  cart: CartReducer,
  address: AddressReducer,
  order: OrderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(myMiddleware),
});
