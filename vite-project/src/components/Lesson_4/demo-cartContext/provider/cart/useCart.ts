import { useContext } from "react";
import { CartContext } from "../cart/cart-Context";

export const useCart = () => useContext(CartContext);