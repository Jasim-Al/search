"use client";
import { createContext, useState } from "react";
import { Product } from "../types";

const productContext = createContext<{ selectedProduct: Product | null; setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>> }>({
  selectedProduct: null,
  setSelectedProduct: () => {},
});

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return <productContext.Provider value={{ selectedProduct, setSelectedProduct }}>{children}</productContext.Provider>;
};

export default productContext;
