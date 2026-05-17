import { createContext } from "react";
import type { CartItem } from "../../types";

type CartContextType = {
    cart: CartItem[];
    coupon: string;
    AddToCart: (item: Omit<CartItem, "quantity">) => void;
    applyCoupon: (code: string) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    subTotal: number;
    discount: number;
    total: number;  
};

export const CartContext = createContext<CartContextType | null>(null);