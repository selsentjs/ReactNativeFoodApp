import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const GridFoodSlice = createSlice({
  name: 'GridFood',
  initialState,
  reducers: {
    setGridFood(state, action) {
      state.data = action.payload;
    },
  },
});

export const {setGridFood} = GridFoodSlice.actions;

export default GridFoodSlice.reducer;
