import {configureStore} from '@reduxjs/toolkit';
import HorizontalReducer from '../slice/HorizontalFoodSlice';
const store = configureStore({
  reducer: {
    HorizontalFood: HorizontalReducer,
  },
});

export default store;
