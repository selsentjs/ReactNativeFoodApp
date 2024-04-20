import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import HorizontalReducer from '../slice/HorizontalFoodSlice';
import GridReducer from '../slice/GridFoodSlice';
import FavoriteFoodReducer from '../slice/FavoriteFoodSlice';
import CartReducer from '../slice/CartSlice';
import AddressReducer from '../slice/AddressSlice';

const store = configureStore({
  reducer: {
    HorizontalFood: HorizontalReducer,
    GridFood: GridReducer,
    FavoriteFood: FavoriteFoodReducer,
    cart: CartReducer,
    address: AddressReducer,
  },
  
});

export default store;
