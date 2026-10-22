import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getNewArrivals } from "../../services";
import { noImage } from "../../utils/images";
import { getDiscountAmount } from "../../helpers/products";
import { discountTypes, categoryType } from "../../constants";
import { getImageUrl } from "../../utils/imageUrl";
import ProductSpecs from "../product/ProductSpecs";

/**
 * "Latest in the shop" block of the home page.
 *
 * Products are grouped by laptop category. Each category gets its own
 * horizontal scrollable row showing 4 items at a time with left/right
 * navigation arrows.
 */
export default function NewArrivals() {
  const [list, setList] = useState([]);
  const scrollRefs = useRef({});

  const scrollLeft = useCallback((catName) => {
    const ref = scrollRefs.current[catName];
    if (ref) {
      ref.scrollBy({ left: -320, behavior: "smooth" });
    }
  }, []);

  const scrollRight = useCallback((catName) => {
    const ref = scrollRefs.current[catName];
    if (ref) {
      ref.scrollBy({ left: 320, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getNewArrivals().then((data) => {
      if (isMounted) {
        setList(Array.isArray(data) ? data : []);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!list.length) return null;

  // Group products by category name (laptop categories only)
  const grouped = list.reduce((acc, item) => {
    if (item.type !== categoryType.Laptop) return acc;
    const cat = item.category?.name || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <section className="lil-section lil-section--tint lil-new-arrivals">
      <div className="container">
        <div className="lil-section__head">
          <span className="lil-eyebrow">Fresh arrivals</span>
          <h2 className="lil-section__title">Just landed in the shop</h2>
          <p className="lil-section__sub">
            The machines we added to our stock most recently - call us before
            they are gone.
          </p>
        </div>

        {categories.map((catName) => {
          const items = grouped[catName];

          return (
            <div key={catName} className="lil-arrivals-row">
              <h3 className="lil-arrivals__cat-title">{catName}</h3>

              <div className="lil-arrivals__nav">
                <button
                  className="lil-arrivals__arrow lil-arrivals__arrow--left"
                  onClick={() => scrollLeft(catName)}
                >
                  &#10094;
                </button>

                <div
                  className="lil-arrivals__track"
                  ref={(el) => {
                    scrollRefs.current[catName] = el;
                  }}
                >
                  {items.map((item) => {
                    const { discountAmount, discountType, discountPrice } =
                      getDiscountAmount(item.category, item);

                    const imageSrc =
                      item.images && item.images.length > 0
                        ? getImageUrl(
                            typeof item.images[0] === "string"
                              ? item.images[0]
                              : item.images[0].imageUrl
                          )
                        : noImage;

                    return (
                      <article className="lil-card" key={item.id}>
                        <Link
                          className="lil-card__media"
                          to={{
                            pathname: `/productDetails/${item.id}`,
                            state: { id: item.id },
                          }}
                        >
                          <img src={imageSrc} alt={item.name} />
                          {discountAmount > 0 && (
                            <span className="lil-card__badge">
                              Save {discountAmount.toLocaleString()}{" "}
                              {discountType === discountTypes.amount ? "PKR" : "%"}
                            </span>
                          )}
                        </Link>

                        <div className="lil-card__body">
                          <span className="lil-card__cat">
                            {item.type === categoryType.Laptop
                              ? "Laptop"
                              : "Accessories"}
                          </span>

                          <h3 className="lil-card__title">
                            <Link
                              to={{
                                pathname: `/productDetails/${item.id}`,
                                state: { id: item.id },
                              }}
                            >
                              {item.name}
                            </Link>
                          </h3>

                          <ProductSpecs product={item} />

                          <div className="lil-card__foot">
                            <div className="lil-card__price">
                              {discountAmount > 0 ? (
                                <>
                                  <del>Rs {item.price?.toLocaleString()}</del>
                                  Rs {discountPrice?.toLocaleString()}
                                </>
                              ) : (
                                <>Rs {item.price?.toLocaleString()}</>
                              )}
                            </div>

                            <Link
                              className="lil-btn lil-btn--primary lil-btn--sm"
                              to={{
                                pathname: `/productDetails/${item.id}`,
                                state: { id: item.id },
                              }}
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <button
                  className="lil-arrivals__arrow lil-arrivals__arrow--right"
                  onClick={() => scrollRight(catName)}
                >
                  &#10095;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
