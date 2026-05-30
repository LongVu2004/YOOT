import type { CartItem } from "../types";
import { coupons } from "../services/coupon";
import { CART_ACTION } from "./cart-actions.ts";

export interface CartState {
    cart: CartItem[],
    coupon: string
}

export const initialCartState: CartState = {
    cart: [],
    coupon: ""
}

type CartAction =
{
    type: typeof CART_ACTION.ADD_TO_CART,
    payload: Omit<CartItem, "quantity">
} | 
{
    type: typeof CART_ACTION.REMOVE_FROM_CART,
    payload: number
} |
{
    type: typeof CART_ACTION.INCREASE_QUANTITY,
    payload: number
} |
{
    type: typeof CART_ACTION.DECREASE_QUANTITY,
    payload: number
} |
{
    type: typeof CART_ACTION.APPLY_COUPON,
    payload: string
}

export const cartReducer = (
    state: CartState, 
    action: CartAction
): CartState => { 
    switch (action.type) {
        case CART_ACTION.ADD_TO_CART: {
            const item = action.payload;
            const existingItem = state.cart.find(i => i.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(i =>
                        i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
                    )
                };
            }
            return {
                ...state,
                cart: [...state.cart, { ...item, quantity: 1 }]
            };
        }
        case CART_ACTION.REMOVE_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter(i => i.id !== action.payload)
            };
        }
        case CART_ACTION.INCREASE_QUANTITY: {
            return {
                ...state,
                cart: state.cart.map(i =>
                    i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
                )
            };
        }
        case CART_ACTION.DECREASE_QUANTITY: {
            return {
                ...state,
                cart: state.cart.map(i =>
                    i.id === action.payload
                        ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
                )
            };
        }
        case CART_ACTION.APPLY_COUPON: {
            if (coupons.find(c => c.code === action.payload)) {
                return {
                    ...state,
                    coupon: action.payload
                };
            } else {
                return {
                    ...state,
                    coupon: ""
                };
            }   
        }
        default:
            return state;
    }   
}
