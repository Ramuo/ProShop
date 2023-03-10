import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productListSlice';
import productReducer from '../features/product/productDetailsSlice';
import cartReducer from '../features/cart/cartSlice';



export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer
  },
})


// REPOS: https://github.com/iqbal86/MERN-eCommerce-Redux-toolkit/tree/master/frontend/src