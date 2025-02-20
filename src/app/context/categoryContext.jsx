"use client";
import { createContext, useContext, useState } from "react";

// 1. Buat Context
const CategoryContext = createContext();

// 2. Buat Provider
export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// 3. Hook untuk menggunakan Context
export const useCategory = () => useContext(CategoryContext);
