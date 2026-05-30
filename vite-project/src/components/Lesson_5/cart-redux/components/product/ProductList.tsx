import { product } from "../../services/product";
import ProductItem from "./ProductItem";

const ProductList = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {product.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
