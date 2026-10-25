
import { useEffect, useState } from "react";

const STORAGE_KEY = "chiffon-favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    setFavorites((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );
  };

  const isFavorite = (productId) => favorites.includes(productId);

  return { favorites, toggleFavorite, isFavorite };
}
