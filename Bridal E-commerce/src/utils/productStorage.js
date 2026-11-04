import { products as initialProducts } from "../data/Product";

const STORAGE_KEY = "chiffon_products";

export const getProducts = () => {
  try {
    const savedProducts = localStorage.getItem(STORAGE_KEY);

    if (savedProducts) {
      return JSON.parse(savedProducts);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialProducts)
    );

    return initialProducts;
  } catch (error) {
    console.error("Error loading products:", error);
    return initialProducts;
  }
};

export const saveProducts = (products) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(products)
    );

    window.dispatchEvent(new Event("productsUpdated"));
  } catch (error) {
    console.error("Error saving products:", error);
    alert("Storage full! Please use smaller images.");
  }
};