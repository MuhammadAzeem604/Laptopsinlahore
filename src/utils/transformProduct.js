export const transformProduct = (product) => {
  if (!product) return product;
  const transformed = { ...product };
  
  // Ensure details object exists
  if (!transformed.details) {
    transformed.details = {
      Series: transformed.series || "",
      Model: transformed.model || "",
      CPU: transformed.cpu || "",
      GPU: transformed.gpu || "",
      Generation: transformed.generation || "",
      Ram: transformed.ram || "",
      HDD: transformed.hdd || "",
      Condition: transformed.condition || "",
    };
  }
  
  // Ensure images is array
  if (!transformed.images) {
    transformed.images = [];
  }
  
  return transformed;
};

export const transformProducts = (products) => {
  if (!Array.isArray(products)) return products;
  return products.map(transformProduct);
};
