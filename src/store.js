// src/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Redux/userSlice';
import counterReducer from './Redux/counterSlice'; // If using a counter slice
import cartReducer from './Redux/cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // user slice here
    counter: counterReducer, // other slices
    cart: cartReducer
  },
});
