import { discountTypes } from "../constants";

export const getDiscountAmount = (category, product) => {
  let discountAmount = 0;
  let discountType = "";
  let discountPrice = 0;

  let discount = 0;
  let type = "";

  if (category.discount && category.discount > 0 && category.discountType) {
    discount = category.discount;
    type = category.discountType;
  }

  if (product.discount && product.discount > 0 && product.discountType) {
    discount = product.discount;
    type = product.discountType;
  }

  const price = product.price;

  if (type && discount && discount > 0) {
    discountAmount = discount;
    discountType = type;
    discountPrice =
      type === discountTypes.amount
        ? parseFloat(price) - parseFloat(discount)
        : parseFloat(price) - (parseFloat(price) / 100) * parseFloat(discount);
  }

  return { discountAmount, discountType, discountPrice };
};
