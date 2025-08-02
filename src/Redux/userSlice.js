// src/Redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  value: 0,  // Make sure value is defined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    addIncrement: (state) => {
      state.value += 1;
    },
  },
});

export const { addIncrement, setMessage } = userSlice.actions;
export default userSlice.reducer;
