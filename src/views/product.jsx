import React, { useState, useEffect } from "react";
import ProductBreadCrumbs from "../components/productDetail/productBreadCrumbs";
import ProductDetailView from "../components/productDetail/productDetailView";
// import ProductDetailsTabs from "../components/productDetail/productsDetailsTabs";
import SimilarProducts from "../components/productDetail/similarProducts";
import { useHistory } from "react-router-dom";
import { Home } from "../router/routes";
import { getProduct, getRelatedProducts } from "../services";

export default function Product() {
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([]);
    const id = history.location?.state?.id || history.location?.pathname?.split("/").pop();
    const fetchProduct = async () => {
      if (id) {
        const detail = await getProduct(id);
        if (detail) {
          setProduct(detail);
        } else {
          history.push(Home);
        }
      } else {
        history.push(Home);
      }
    };
    fetchProduct();
  }, [history.location]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (product) {
        const data = await getRelatedProducts(product.id);
        setList(data || []);
      }
    };
    fetchRelated();
  }, [product]);

  return (
    <main className="main">
      {!product ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem 0" }}>
          <div style={{ width: 48, height: 48, border: "5px solid #ccc", borderTopColor: "#333", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        </div>
      ) : (
        <>
          <ProductBreadCrumbs product={product} />
          <ProductDetailView product={product} />
          <div className="container">
            <SimilarProducts product={product} list={list} />
          </div>
        </>
      )}
    </main>
  );
}
