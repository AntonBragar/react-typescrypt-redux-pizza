import { configureStore } from "@reduxjs/toolkit";
import filerReducer from "../redux/slices/filterSlice";
import cartReducer from "../redux/slices/cartSlice";
import pizzaReducer from "../redux/slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter: filerReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});
