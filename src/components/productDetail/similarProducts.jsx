import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { noImage } from "../../utils/images";
import { Link } from "react-router-dom";
import { categoryType } from "../../constants";
import { scrollToTop } from "../../utils/common";
import { getDiscountAmount } from "../../helpers/products";
import { discountTypes } from "../../constants";
import { getImageUrl } from "../../utils/imageUrl";
import ProductSpecs from "../product/ProductSpecs";

/**
 * The API returns the images as objects ({ imageUrl }) while the local
 * fallback data uses plain strings, so both shapes have to be supported.
 */
const resolveImage = (image) =>
  getImageUrl(typeof image === "string" ? image : image?.imageUrl);

export default function SimilarProducts({ product, list }) {
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    navText: [
      "<div class='nav-btn prev-slide'><</div>",
      "<div class='nav-btn next-slide'>></div>",
    ],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  return (
    <>
      {list.length > 0 && (
        <>
          <h2 className="title text-center mb-4">Related</h2>
          <OwlCarousel className="slider-items owl-carousel" {...options}>
            {list.map((item, index) => {
              const images = item.images || [];
              const activeImage =
                images.length > 0 ? resolveImage(images[0]) : noImage;
              const { discountAmount, discountType, discountPrice } =
                getDiscountAmount(item.category, item);

              return (
                <div className="product product-7 text-center" key={index}>
                  <figure className="product-media">
                    {discountAmount > 0 && (
                      <span className="product-label label-circle label-top">
                        Save {discountAmount.toLocaleString()}{" "}
                        {discountType === discountTypes.amount ? "PKR" : "%"}
                      </span>
                    )}

                    <img
                      id={`products-list-main-image-${item.id}`}
                      src={activeImage}
                      alt="Product image"
                      className="product-image"
                    />

                    {/* <div className="product-action-vertical">
                  <a
                    href="#"
                    className="btn-product-icon btn-wishlist btn-expandable"
                  >
                    <span>add to wishlist</span>
                  </a>
                  <a
                    href="popup/quickView.html"
                    className="btn-product-icon btn-quickview"
                    title="Quick view"
                  >
                    <span>Quick view</span>
                  </a>
                  <a
                    href="#"
                    className="btn-product-icon btn-compare"
                    title="Compare"
                  >
                    <span>Compare</span>
                  </a>
                </div> */}

                    <div className="product-action">
                      <Link
                        onClick={scrollToTop}
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
                    <div className="product-cat">
                      {product.type === categoryType.Laptop
                        ? "Laptop"
                        : "Accessories"}
                    </div>
                    <h3 className="product-title">
                      <Link
                        onClick={scrollToTop}
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
                      RS {item.price.toLocaleString()}
                    </div>
                    {discountAmount > 0 && (
                      <div className="product-price">
                        RS {discountPrice.toLocaleString()}
                      </div>
                    )}

                    <ProductSpecs product={item} />

                    {/* <div className="ratings-container">
                  <div className="ratings">
                    <div className="ratings-val" style={{ width: "20%" }}></div>
                  </div>
                  <span className="ratings-text">( 2 Reviews )</span>
                </div> */}
                    {images.length > 1 && (
                      <div className="product-nav product-nav-thumbs">
                        {images.map((imageItem, imgIndex) => {
                          const thumbSrc = resolveImage(imageItem);
                          return (
                            <span
                              key={imgIndex}
                              onClick={() => {
                                const mainImage = document.getElementById(
                                  `products-list-main-image-${item.id}`
                                );
                                if (mainImage) mainImage.src = thumbSrc;
                              }}
                              className="active cursor-pointer"
                            >
                              <img src={thumbSrc} alt={`thumb-${imgIndex}`} />
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </OwlCarousel>
        </>
      )}
    </>
  );
}
