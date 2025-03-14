"use client";

import React from "react";
import { Product } from "../types";

const useKeyboard = (
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>,
  focusedIndex: number,
  items: Product[],
  onClose: () => void,
  onSelect: React.Dispatch<React.SetStateAction<Product | null>>
) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prevIndex) => {
          const newIndex = prevIndex <= 0 ? items.length - 1 : prevIndex - 1;
          return newIndex;
        });

        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prevIndex) => {
          const newIndex = prevIndex >= items.length - 1 ? 0 : prevIndex + 1;
          return newIndex;
        });

        break;

      case "Escape":
        e.preventDefault();
        onClose();
        e.currentTarget.blur();
        setFocusedIndex(items.length - 1);
        break;
      case "Enter":
        if (focusedIndex >= 0 && focusedIndex < items.length) {
          //Handle enter key press on focused item
          onSelect(items[focusedIndex]);
          onClose();
        }
        break;
      default:
        break;
    }
  };

  return { handleKeyDown };
};

export default useKeyboard;
