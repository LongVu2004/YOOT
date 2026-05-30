import { CartContext } from "./cart-Context";
import { coupons } from "../../services/coupon";
import { cartReducer, initialCartState } from "../../constants/cart-reducer";
import { CART_ACTION } from "../../constants/cart-actions";
import { useReducer } from "react";
import type { CartItem } from "../../types";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    dispatch({
      type: CART_ACTION.ADD_TO_CART,
      payload: item,
    });
  };

  const removeFromCart = (id: number) => {
    dispatch({
      type: CART_ACTION.REMOVE_FROM_CART,
      payload: id,
    });
  };

  const increaseQuantity = (id: number) => {
    dispatch({
      type: CART_ACTION.INCREASE_QUANTITY,
      payload: id,
    });
  };

  const decreaseQuantity = (id: number) => {
    dispatch({
      type: CART_ACTION.DECREASE_QUANTITY,
      payload: id,
    });
  };

  const applyCoupon = (code: string) => {
    dispatch({
      type: CART_ACTION.APPLY_COUPON,
      payload: code,
    });
  };

  const subTotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discountRate =
    coupons.find((c) => c.code === state.coupon)?.discount || 0;
  const discountAmount = subTotal * discountRate;
  const total = subTotal - discountAmount;

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        coupon: state.coupon,
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
};

export default CartProvider;
