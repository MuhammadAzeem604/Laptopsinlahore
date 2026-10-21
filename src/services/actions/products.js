import api from "../api";
import { transformProduct, transformProducts } from "../../utils/transformProduct";

export const getProductsList = async (
  productType,
  search,
  selectedCategory,
  priceRange,
  sortBy,
  pagination
) => {
  try {
    const response = await api.get("/Products", {
      params: {
        productType: productType || "all",
        search: search || "",
        categoryId: selectedCategory || null,
        minPrice: priceRange?.[0],
        maxPrice: priceRange?.[1],
        sortBy: sortBy || "low",
        page: pagination?.page || 1,
        perPage: pagination?.perPage || 8,
      },
    });
    const raw = response.data;
    // Normalize responses: backend may return an array or PascalCase properties.
    if (Array.isArray(raw)) {
      return { list: transformProducts(raw), paginationDetail: { total: raw.length } };
    }
    const list = raw?.list ?? raw?.List ?? [];
    const paginationDetail = raw?.paginationDetail ?? raw?.PaginationDetail ?? { total: list.length };
    const normalized = { ...raw, list: transformProducts(list), paginationDetail };
    return normalized;
  } catch (error) {
    console.error("Error fetching products:", error);
    return { list: [], paginationDetail: { total: 0 } };
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/Products/${id}`);
    return transformProduct(response.data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const getRelatedProducts = async (id) => {
  try {
    const response = await api.get(`/Products/${id}/related`);
    return transformProducts(response.data);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};

export const getNewArrivals = async () => {
  try {
    const response = await api.get("/Products/new-arrivals");
    return transformProducts(response.data);
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
};

export const getAllProductsAdmin = async () => {
  try {
    const response = await api.get("/Products/all");
    return transformProducts(response.data);
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const createProduct = async (formData) => {
  try {
    const response = await api.post("/Products", formData);
    return transformProduct(response.data);
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const response = await api.put(`/Products/${id}`, formData);
    return transformProduct(response.data);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/Products/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
