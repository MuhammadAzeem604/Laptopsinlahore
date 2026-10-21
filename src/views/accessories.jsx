import React from "react";
import ProductList from "../components/product/productList";
import { categoryType } from "../constants";

export default function Accessories() {
  return (
    <main>
      <ProductList productType={categoryType.Accessories} />
    </main>
  );
}
