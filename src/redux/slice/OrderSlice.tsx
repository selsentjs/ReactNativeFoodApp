import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Define the thunk for fetching order data
export const fetchOrderData = createAsyncThunk(
  'order/fetchOrderData',
  async () => {
    const response = await axios.get(
      'http://192.168.1.6:3000/api/v1/orderDetails',
    );
    console.log('res:', response.data)
    return response.data;
  },
);

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderItem(state, action) {
      const {orderId, orderData} = action.payload;
      state.data.push({orderId, ...orderData});
    },
    removeOrder(state, action) {
      state.data = state.data.filter(
        order => order.paymentId !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrderData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchOrderData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchOrderData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {orderItem, removeOrder} = OrderSlice.actions;
export default OrderSlice.reducer;
