"use client";

import productContext from "@/lib/context/productContext";
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

function DetailedView() {
  const { selectedProduct } = React.useContext(productContext);
  if (!selectedProduct) return <Card>Please select a product</Card>;
  return (
    <Card className="w-[60%] mx-auto">
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="row-span-2 flex items-center justify-center">
          <Image src={selectedProduct.image} alt={selectedProduct.title} width={800} height={600} className="h-48 w-48 object-cover" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{selectedProduct.title}</h1>
          <div className="mb-5">
            <span>{selectedProduct.category}</span>
          </div>
          <Card className="flex items-center flex-row w-20 bg-blue-500 gap-x-6 gap-y-0 px-3 py-1 rounded box-content">
            <span className="text-white text-xl">{selectedProduct.rating.rate}</span>
            <svg className="w-6 h-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </Card>
          <span className="mt-5 opacity-45 font-bold">Out of {selectedProduct.rating.count} reviews</span>
        </div>
        <div className="col-start-2">
          <p className="text-lg">{selectedProduct.description}</p>
          <p className="text-lg font-bold">${selectedProduct.price}</p>
        </div>
      </div>
    </Card>
  );
}

export default DetailedView;
