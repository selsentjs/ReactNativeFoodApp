import {createSlice} from '@reduxjs/toolkit';

interface Address {
  id: string;
  state: string;
  city: string;
  street: string;
  pinCode: string;
  type: string;
}

const initialState = {
  data: [] as Address[], 
};


const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress(state, action) {
      state.data.push(action.payload);
    },
    deleteAddress(state, action) {
      state.data = state.data.filter(item => item.id !== action.payload);
    },
    updateAddress(state, action) {
      state.data = state.data.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            state: action.payload.state,
            city: action.payload.city,
            street: action.payload.street,
            pinCode: action.payload.pinCode,
            type: action.payload.type,
          };
        } else {
          return item;
        }
      });
    },
  },
});

export const {addAddress, deleteAddress, updateAddress} = AddressSlice.actions;
export default AddressSlice.reducer;
