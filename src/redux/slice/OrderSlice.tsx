import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderData(state, action) {
      state.data = action.payload;
    },
    orderItem(state, action) {
      const {orderId, orderData} = action.payload;
      // Check if an item with the same orderId exists
      const existingIndex = state.data.findIndex(
        item => item.orderId === orderId,
      );
      if (existingIndex !== -1) {
        // If exists, update the item
        state.data[existingIndex] = {orderId, ...orderData};
      } else {
        // If not exists, add a new item
        state.data.push({orderId, ...orderData});
      }
    },
  },
});

export const {setOrderData, orderItem} = OrderSlice.actions;

export default OrderSlice.reducer;
