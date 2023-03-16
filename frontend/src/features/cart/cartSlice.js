
import {  createSlice } from '@reduxjs/toolkit'
// import cartService from './cartService'

// var cartItems = []
const cartItems = JSON.parse(localStorage.getItem('cart'))
// var shippingAdress = []
const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))
const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))
// const total = JSON.parse(localStorage.getItem('total'))

const initialState = {
  cartItems: cartItems ? cartItems : [],
  shippingAddress: shippingAddress ? shippingAddress : [],
  paymentMethod:  paymentMethod ?  paymentMethod : []
}


// REDUCERS
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // METHOD 5 Working Excellent
      const itemExist = state.cartItems.find(
        (item) => item._id === action.payload._id,
      )

      if (itemExist) {
        const qtyInx = state.cartItems.findIndex(
          (item) => item._id === action.payload._id,
        )

        state.cartItems[qtyInx].qty = action.payload.qty
      } else {
        state.cartItems.push(action.payload)
      }

      // localStorage.setItem('total', JSON.stringify(state.total))
      localStorage.setItem('cart', JSON.stringify(state.cartItems)) // giving null in browser localstorage and also doesnt work with the state return method.
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
    },
  },
})

export const {
  removeFromCart,
  addToCart,
  saveShippingAddress,
  savePaymentMethod

} = cartSlice.actions
export default cartSlice.reducer


