import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

const cartSlice = createSlice ({
    name:'cart',
    initialState,
    reducers:{
        add(state, action){
            state.push(action.payload)
        },
        remove(state, action){
            return state.filter((eachProduct) => eachProduct.id !== action.payload)
        },
        clearCart(state) {
          return []; // simply empties the cart array
        }

    }
})

export const {add, remove, clearCart} = cartSlice.actions;
export default cartSlice.reducer