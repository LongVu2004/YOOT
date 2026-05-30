import { Button, Card } from "antd";
import type { CartItem } from "../../types";
import { useAppDispatch } from "../../../redux/hooks";
import { addToCart } from "../../slice/cartSlice";

interface ProductItemProps {
  product: Omit<CartItem, "quantity">;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <Card key={product.id} title={product.name}>
      <p>{product.price.toLocaleString()} VND</p>

      <Button
        type="primary"
        className="mt-2"
        onClick={() =>
          dispatch(
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
            }),
          )
        }
      >
        Add to cart
      </Button>
    </Card>
  );
};

export default ProductItem;
