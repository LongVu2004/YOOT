import { createSlice } from "@reduxjs/toolkit";
import { coupons } from "../services/coupon";
import type { CartItem } from "../types";

type CartState = {
    items: CartItem[];
    coupon: string;
};

const initialState: CartState = {
    items: [],
    coupon: ""
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exist = state.items.find((i) => i.id === action.payload.id);
            if (exist) {
                exist.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                i => i.id !== action.payload
            );

            if (state.items.length === 0) {
                state.coupon = "";
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);

            if(item){
                if (item.quantity > 1) {
                    item.quantity -= 1;
                }
            }
        },
        applyCoupon: (state, action) => {
            const code = action.payload;

            const found = coupons.find((c) => c.code === code);

            if (found) {
                state.coupon = found.code;
            } else {
                state.coupon = "";
            }
        },
        clearCoupon: (state) => {
            state.coupon = "";
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    applyCoupon,
    clearCoupon
} = cartSlice.actions;

export default cartSlice.reducer; 