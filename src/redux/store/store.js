import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import HorizontalReducer from '../slice/HorizontalFoodSlice';
import GridReducer from '../slice/GridFoodSlice';
import FavoriteFoodReducer from '../slice/FavoriteFoodSlice';
import CartReducer from '../slice/CartSlice'

const store = configureStore({
  reducer: {
    HorizontalFood: HorizontalReducer,
    GridFood: GridReducer,
    FavoriteFood: FavoriteFoodReducer,
    cart: CartReducer,
  },
  
});

export default store;
