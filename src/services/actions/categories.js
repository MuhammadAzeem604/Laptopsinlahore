import api from "../api";

export const getCategoriesList = async (type = "all") => {
  try {
    const response = await api.get("/Categories", { params: { type } });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategory = async (id) => {
  try {
    const response = await api.get(`/Categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

export const getBrands = async () => {
  try {
    const response = await api.get("/Categories", { params: { type: "laptop" } });
    return response.data;
  } catch (error) {
    return [];
  }
};
