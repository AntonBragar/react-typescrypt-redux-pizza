import { calcTotalPrice } from "./CalcTotalPrice";
import { CartItem } from "../redux/slices/cart/types";

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
