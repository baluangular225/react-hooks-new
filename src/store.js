// src/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Redux/userSlice';
import counterReducer from './Redux/counterSlice'; // If using a counter slice
import cartReducer from './Redux/cartSlice';
import dataReducer from './Redux/dataSlice';
import productReducer from './Redux/productSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // user slice here
    counter: counterReducer, // other slices
    cart: cartReducer,
    data: dataReducer,
    productReducer: productReducer,
  },
});

// Development-only: log store updates to help debug selector visibility
if (process.env.NODE_ENV !== 'production') {
  store.subscribe(() => {
    // small, structured log so it's easy to spot
    const state = store.getState();
    console.log('STORE UPDATE -> productReducer:', state.productReducer);
  });
}