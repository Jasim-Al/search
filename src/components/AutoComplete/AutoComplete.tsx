"use client";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import useDebounce from "@/lib/hooks/useDebounce";
import useKeyboard from "@/lib/hooks/useKeyboard";
import { Product } from "@/lib/types";
import productContext from "@/lib/context/productContext";

function AutoComplete() {
  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  };

  const { data, error, isLoading } = useQuery<Product[]>({ queryKey: ["products"], queryFn: fetchProducts });

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [filteredData, setFilteredData] = useState<Product[]>(data || []);
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedProduct } = useContext(productContext);

  const listRef = useRef(null);
  const itemRefs = useRef<React.RefObject<HTMLLIElement>[]>([]);

  useEffect(() => {
    itemRefs.current = filteredData.map((_, i) => itemRefs.current[i] || React.createRef());
  }, [filteredData]);

  const { handleKeyDown } = useKeyboard(setFocusedIndex, focusedIndex, filteredData, () => setIsSearchFocused(false), setSelectedProduct);

  const filterData = (searchTerm: string) => {
    return data && data?.length > 0 ? data.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase())) : [];
  };

  const handleSearch = useDebounce((searchTerm: string) => {
    setFilteredData(filterData(searchTerm));
  }, 300);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  }

  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex] && itemRefs.current[focusedIndex].current) {
      itemRefs.current[focusedIndex].current.focus();
    }
  }, [focusedIndex]);

  useEffect(() => {
    setFilteredData(data || []);
  }, [data]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Input
        placeholder="Enter your search term"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={(e) => {
          setIsSearchFocused(true);
          handleKeyDown(e);
        }}
        className="p-2 w-96"
        onFocus={() => {
          setIsSearchFocused(true);
        }}
      
      />

      {isSearchFocused && (
        <div className="relative top-0 left-0 w-96">
          <Card className="absolute max-h-96 overflow-auto z-20">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <ul
                className="flex flex-col gap-2 mx-2 "
                onKeyDown={(e) => {
                  handleKeyDown(e);
                }}
                ref={listRef}
                tabIndex={0}
              >
                {filteredData.length > 0 ? (
                  filteredData?.map((product, index) => (
                    <li
                      className={`cursor-pointer hover:bg-blue-200 ${focusedIndex === index ? "bg-blue-200" : "bg-white"} p-2 rounded-sm`}
                      key={index}
                      tabIndex={-1}
                      ref={itemRefs.current[index]}
                      onMouseEnter={() => setFocusedIndex(index)}
                      onClick={() => {
                        setSelectedProduct(product);
                        setSearchTerm(product.title);
                        setIsSearchFocused(false);
                      }}
                    >
                      {product.title}
                    </li>
                  ))
                ) : (
                  <li className={`w-96 p-2 rounded-sm`}>No result</li>
                )}
              </ul>
            )}
          </Card>
        </div>
      )}

      {isSearchFocused && <div className="absolute top-0 right-0 h-screen w-screen  z-10" onClick={() => setIsSearchFocused(false)}></div>}
    </div>
  );
}

export default AutoComplete;
