import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, updateProduct } from "./store/productSlice";

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productSlice.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      {products.map((product) => (
        <p
          key={product._id}
          onClick={() => dispatch(updateProduct({ product, amount: -1 }))}
        >
          {product.name}: {product.inStock}
        </p>
      ))}
    </div>
  );
};

export default App;
