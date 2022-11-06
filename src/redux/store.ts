import { configureStore } from "@reduxjs/toolkit";
import filerReducer from "./slices/filter/slice";
import cartReducer from "./slices/cart/slice";
import pizzaReducer from "./slices/pizza/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filerReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
