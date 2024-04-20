import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const HorizontalFoodSlice = createSlice({
  name: 'HorizontalFood',
  initialState,
  reducers: {
    setHorizontalFood(state, action) {
      state.data = action.payload;
    },
  },
});

export const {setHorizontalFood} = HorizontalFoodSlice.actions;

export default HorizontalFoodSlice.reducer;
