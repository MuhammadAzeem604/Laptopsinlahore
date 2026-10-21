import { noImage } from "../../utils/images";
import { Link } from "react-router-dom";
import { getDiscountAmount } from "../../helpers/products";
import { discountTypes } from "../../constants";
import { getImageUrl } from "../../utils/imageUrl";
import ProductSpecs from "./ProductSpecs";

export default function Product({ productsList, productTypeLabel }) {
  return (
    <div className="products mb-3">
      <div className="row justify-content-center">
        {productsList.map((item, index) => {
          const activeImageSrc =
            item.images && item.images.length > 0
              ? getImageUrl(typeof item.images[0] === "string" ? item.images[0] : item.images[0].imageUrl)
              : noImage;
          const { discountAmount, discountType, discountPrice } =
            getDiscountAmount(item.category, item);
          return (
            <div className="col-6 col-md-4 col-lg-4 col-xl-3" key={index}>
              <div className="product product-7 text-center">
                <figure className="product-media">
                  {discountAmount > 0 && (
                    <span className="product-label label-circle label-top">
                      Save {discountAmount.toLocaleString()}{" "}
                      {discountType === discountTypes.amount ? "PKR" : "%"}
                    </span>
                  )}

                  <img
                    id={`products-list-main-image-${item.id}`}
                    src={activeImageSrc}
                    alt="Product image"
                    className="product-image"
                  />

                  <div className="product-action">
                    <Link
                      to={{
                        pathname: `/productDetails/${item.id}`,
                        state: { id: item.id },
                      }}
                      className="btn-product btn-quickview"
                    >
                      <span>View Details</span>
                    </Link>
                  </div>
                </figure>

                <div className="product-body">
                  <div className="product-cat">{productTypeLabel}</div>
                  <h3 className="product-title">
                    <Link
                      to={{
                        pathname: `/productDetails/${item.id}`,
                        state: { id: item.id },
                      }}
                    >
                      {item.name}
                    </Link>
                  </h3>

                  <div
                    className={`product-price ${
                      discountAmount > 0 ? "canceled-price mb-0" : ""
                    }`}
                  >
                    RS {item.price?.toLocaleString()}
                  </div>
                  {discountAmount > 0 && (
                    <div className="product-price">
                      RS {discountPrice?.toLocaleString()}
                    </div>
                  )}

                  <ProductSpecs product={item} />

                  {item.images && item.images.length > 1 && (
                    <div className="product-nav product-nav-thumbs">
                      {item.images.map((imageItem, idx) => {
                        const thumbSrc = getImageUrl(
                          typeof imageItem === "string" ? imageItem : imageItem.imageUrl
                        );
                        return (
                          <span
                            key={idx}
                            onClick={() => {
                              document.getElementById(
                                `products-list-main-image-${item.id}`
                              ).src = thumbSrc;
                            }}
                            className="active cursor-pointer"
                          >
                            <img src={thumbSrc} alt={`thumb-${idx}`} />
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {productsList.length === 0 && (
          <div className="no-results">Out of stock.</div>
        )}
      </div>
    </div>
  );
}
