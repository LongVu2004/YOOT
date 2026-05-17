import { useState } from 'react';
import { CartContext } from './cart-Context';
import type { CartItem } from "../../types";
import { coupons } from "../../services/coupon";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [coupon, setCoupon] = useState<string>("");

    const addToCart = (item: Omit<CartItem, "quantity">) => {
        setCart(prev => {
            const existingItem = prev.find(i => i.id === item.id);
            if (existingItem) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };
    const increaseQuantity = (id: number) => {
        setCart(prev =>
            prev.map(i =>
                i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            )
        );
    };
    const decreaseQuantity = (id: number) => {
        setCart(prev =>
            prev.map(i =>
                i.id === id
                    ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
            )
        );
    }

    const applyCoupon = (code: string) => {
        if (coupons.find(c => c.code === code)) {
            setCoupon(code);
        } else {
            setCoupon("");
        }
    };

    const subTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const discountRate = coupons.find((c) => c.code === coupon)?.discount || 0;
    const discountAmount = subTotal * discountRate;
    const total = subTotal - discountAmount;

    return (
        <CartContext.Provider
            value={{
                cart,
                coupon,
                AddToCart: addToCart,
                applyCoupon,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                subTotal,
                discount: discountAmount,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;