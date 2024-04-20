const {createSlice} = require('@reduxjs/toolkit');

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  qty: number;
}

const initialState = {
  data: [] as CartItem[],
  isLoading: false,
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    // add favorite food
    addItemToCart(state, action) {
      const existingItem = state.data.find(
        item => item._id === action.payload._id,
      );
      if (existingItem) {
        existingItem.qty += 1; // Increment qty if item exists
      } else {
        // Push the new item if it doesn't exist,
        // making sure to include a qty if it's not already there
        state.data.push({...action.payload, qty: action.payload.qty || 1});
      }
    },
    reduceItemFromCart(state, action) {
      const existingItem = state.data.find(
        item => item._id === action.payload._id,
      );
      if (existingItem && existingItem.qty > 1) {
        existingItem.qty -= 1; // Decrement qty if item exists and qty > 1
      }
    },

    removeItemFromCart(state, action) {
      const itemIndex = state.data.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex !== -1) {
        state.data.splice(itemIndex, 1); // Remove item from cart
      }
    },
    emptyCart(state, action) {
      state.data = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  reduceItemFromCart,
  emptyCart,
} = CartSlice.actions;

export default CartSlice.reducer;
