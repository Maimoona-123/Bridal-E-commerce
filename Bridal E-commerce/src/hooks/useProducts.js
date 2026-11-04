import { useEffect, useState } from "react";
import { getProducts, saveProducts } from "../utils/productStorage";

const useProducts = () => {
  const [products, setProductsState] = useState(getProducts);

  useEffect(() => {
    const updateProducts = () => {
      setProductsState(getProducts());
    };

    window.addEventListener("productsUpdated", updateProducts);
    window.addEventListener("storage", updateProducts);

    return () => {
      window.removeEventListener("productsUpdated", updateProducts);
      window.removeEventListener("storage", updateProducts);
    };
  }, []);

  const setProducts = (newProducts) => {
    saveProducts(newProducts);
  };

  return { products, setProducts };
};

export default useProducts;