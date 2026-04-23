import { createSlice } from "@reduxjs/toolkit";
import { decrement } from "./counterSlice";

const initialState = {
    productsData: [],
  totalPrice: 0,
  lastUpdated: null,
}

const productSlice = createSlice({
    name:'productSlice',
    initialState,
    reducers:{
        incrementProduct:(state, action) => {
             state.productsData.push(action.payload);
             const priceArray = state.productsData.map((eachProduct) => eachProduct.productPrice);
             state.totalPrice = priceArray.reduce((acc, curr) => acc + curr, 0);
             state.lastUpdated = new Date().toLocaleString();
        },
        decrementProduct:(state, action) => {
            const index = state.productsData.findIndex((eachProduct) => eachProduct.productName === action.payload.productName);
            if (index !== -1) {
              state.productsData.splice(index, 1);
              const priceArray = state.productsData.map((eachProduct) => eachProduct.productPrice);
              state.totalPrice = priceArray.reduce((acc, curr) => acc + curr, 0);
              state.lastUpdated = new Date().toLocaleString();
            }
          },
    }
})

export const { incrementProduct, decrementProduct } = productSlice.actions;
export default productSlice.reducer;
  