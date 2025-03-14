"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/app/get-query-client";
import type * as React from "react";
import { ProductProvider } from "./context/productContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductProvider>{children}</ProductProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
