
import { products as initialProducts } from "../data/Product";

const DB_NAME = "ChiffonDB";
const DB_VERSION = 1;
const STORE_NAME = "products";
const STORAGE_KEY = "chiffon_products";

// Open IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

// Save data in IndexedDB
const storeData = async (db, data) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    store.put(data, "allProducts");

    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
};

// Get data from IndexedDB
const readData = async (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.get("allProducts");

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Initialize and migrate old products
export const getProducts = async () => {
  const db = await openDB();

  try {
    let savedProducts = await readData(db);

    if (savedProducts !== undefined) {
      return savedProducts;
    }

    // Migrate existing localStorage products
    const oldProducts = localStorage.getItem(STORAGE_KEY);

    if (oldProducts) {
      try {
        savedProducts = JSON.parse(oldProducts);
      } catch (error) {
        console.error("Old product data could not be parsed:", error);
        savedProducts = initialProducts;
      }
    } else {
      savedProducts = initialProducts;
    }

    // Save migrated or initial products
    await storeData(db, savedProducts);

    // Remove old data only after successful migration
    if (oldProducts) {
      localStorage.removeItem(STORAGE_KEY);
    }

    return savedProducts;
  } finally {
    db.close();
  }
};

// Save products
export const saveProducts = async (products) => {
  const db = await openDB();

  try {
    await storeData(db, products);

    window.dispatchEvent(new Event("productsUpdated"));

    return true;
  } catch (error) {
    console.error("Error saving products:", error);

    alert(
      "Unable to save products. Browser storage may be full."
    );

    throw error;
  } finally {
    db.close();
  }
};
