import { createContext, useContext, useState, useEffect } from "react";

const WardrobeContext = createContext();

export function WardrobeProvider({ children }) {
  const [wardrobeItems, setWardrobeItems] = useState(() => {
    const saved = localStorage.getItem("wardrobeItems");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("wardrobeItems", JSON.stringify(wardrobeItems));
  }, [wardrobeItems]);

  const addItem = (item) => {
    setWardrobeItems((prev) => [{ id: Date.now().toString(), ...item }, ...prev]);
  };

  const removeItem = (id) => {
    setWardrobeItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id, updatedFields) => {
    setWardrobeItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const clearWardrobe = () => {
    setWardrobeItems([]);
  };

  return (
    <WardrobeContext.Provider
      value={{
        wardrobeItems,
        addItem,
        removeItem,
        updateItem,
        clearWardrobe,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  return useContext(WardrobeContext);
}
