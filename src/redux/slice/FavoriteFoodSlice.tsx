const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  data: [],
  isLoading: false,
};

const FavoriteFoodSlice = createSlice({
  name: 'FavoriteFood',
  initialState,

  reducers: {
    // add favorite food
    addFavoriteFood(state, action) {
      const newItem = action.payload;
      // Check if the item already exists in the data array
      const existingItemIndex = state.data.findIndex(
        item => item._id === newItem._id,
      );
      if (existingItemIndex === -1) {
        // If the item doesn't exist, push it to the array
        state.data.push(newItem);
      } 
    },
    removeFavoriteFood(state, action) {
      const itemId = action.payload;
      state.data = state.data.filter(item => item._id !== itemId);
    },
  },
});

export const {addFavoriteFood, removeFavoriteFood} = FavoriteFoodSlice.actions;

export default FavoriteFoodSlice.reducer;
