import { Button, Drawer, InputNumber, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { coupons } from "../../services/coupon";
import {
  applyCoupon,
  clearCoupon,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../slice/cartSlice";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const subTotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discount = coupons.find((c) => c.code === cart.coupon)?.discount || 0;
  const discountAmount = subTotal * discount;

  const total = subTotal - discountAmount;

  return (
    <Drawer title="Your Cart" open={open} onClose={onClose}>
      {/* LIST PRODUCT */}
      {cart.items.map((item) => (
        <div key={item.id} className="mb-4 border-b pb-2">
          <p>{item.name}</p>

          <div className="flex items-center gap-2">
            <Button onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>

            <InputNumber value={item.quantity} disabled />

            <Button onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>

            <Button danger onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </Button>
          </div>
        </div>
      ))}

      {/* COUPON SELECT */}
      <div className="mt-4">
        <p className="font-semibold mb-1">Chọn mã giảm giá</p>

        <Select
          value={cart.coupon || undefined}
          disabled={cart.items.length === 0}
          placeholder="Chọn coupon"
          style={{ width: "100%" }}
          onChange={(value) => dispatch(applyCoupon(value))}
          allowClear
          onClear={() => dispatch(clearCoupon())}
          options={coupons.map((c) => ({
            label: `${c.code} (-${c.discount * 100}%)`,
            value: c.code,
          }))}
        />
      </div>

      {/* PRICE SUMMARY */}
      <div className="mt-4 space-y-1">
        <p>
          Tạm tính: <b>{subTotal.toLocaleString()} VND</b>
        </p>

        <p>
          Giảm giá:{" "}
          <b className="text-red-500">{discountAmount.toLocaleString()} VND</b>
        </p>

        <p className="text-lg font-bold">
          Tổng tiền: {total.toLocaleString()} VND
        </p>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
