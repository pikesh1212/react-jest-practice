import React from "react";
import ProductList from "./ProductList";
import Header from "./Header";
import { CartProvider } from "./CartContext";

export default function ShoppingCart() {
  return (
    <CartProvider>
      <Header />
      <ProductList />
    </CartProvider>
  );
}
