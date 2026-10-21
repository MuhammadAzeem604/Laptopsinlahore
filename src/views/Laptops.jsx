import React from "react";
import ProductList from "../components/product/productList";
import { categoryType } from "../constants";

export default function Laptops() {
  return (
    <main>
      <ProductList productType={categoryType.Laptop} />
    </main>
  );
}
