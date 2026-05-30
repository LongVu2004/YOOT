import { Badge, Button, Card } from "antd";
import { useState } from "react";
import CartDrawer from "../components/cart/CartDrawer";
import { useAppSelector } from "../../redux/hooks";

const Header = () => {
  const cart = useAppSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  const totalQty = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Card>
      <div className="flex justify-between">
        <h1 className="font-bold">Mini Shop</h1>

        <Badge count={totalQty}>
          <Button onClick={() => setOpen(true)}>Cart</Button>
        </Badge>
      </div>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </Card>
  );
};

export default Header;
