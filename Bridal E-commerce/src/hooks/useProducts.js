
import { useEffect, useState, useCallback } from "react";
import { getProducts, saveProducts } from "../utils/productStorage";

const useProducts = () => {
  const [products, setProductsState] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Products from IndexedDB
  useEffect(() => {
    let active = true;

    const updateProducts = async () => {
      try {
        const data = await getProducts();

        if (active) {
          setProductsState(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    updateProducts();

    const handleUpdate = () => {
      updateProducts();
    };

    window.addEventListener("productsUpdated", handleUpdate);

    return () => {
      active = false;
      window.removeEventListener("productsUpdated", handleUpdate);
    };
  }, []);

  // Save Products to IndexedDB
  const setProducts = useCallback(async (newProducts) => {
    try {
      if (!Array.isArray(newProducts)) {
        throw new Error("Products must be an array");
      }

      await saveProducts(newProducts);

      // Update React state
      setProductsState(newProducts);

      // Notify other components
      window.dispatchEvent(new Event("productsUpdated"));

      return true;

    } catch (error) {
      console.error("Product update failed:", error);
      return false;
    }
  }, []);

  return {
    products,
    setProducts,
    loading,
  };
};

export default useProducts;
