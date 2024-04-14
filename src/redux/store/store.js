import {configureStore} from '@reduxjs/toolkit';
import HorizontalReducer from '../slice/HorizontalFoodSlice';
import GridReducer from '../slice/GridFoodSlice';

const store = configureStore({
  reducer: {
    HorizontalFood: HorizontalReducer,
    GridFood: GridReducer,
  },
});

export default store;
