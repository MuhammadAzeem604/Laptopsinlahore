import { Link } from "react-router-dom";
import { Laptops, Accessories } from "../../router/routes";
import { categoryType } from "../../constants";
import { contactInfo } from "../../constants/contact";
import { useEffect, useState } from "react";
import { noImage } from "../../utils/images";
import { getDiscountAmount } from "../../helpers/products";
import { discountTypes } from "../../constants";
import { getImageUrl } from "../../utils/imageUrl";

/**
 * Specification rows rendered on the product detail page.
 * `keys` lists every possible name of the value (API camelCase + details
 * object casing) so the row is filled no matter where the data comes from.
 * Rows flagged with `alwaysShow` are rendered even when the value is empty,
 * so a customer can always see that the information exists (e.g. GPU).
 */
const SPEC_FIELDS = [
  { label: "Series", keys: ["series", "Series"] },
  { label: "Model", keys: ["model", "Model"] },
  { label: "Processor (CPU)", keys: ["cpu", "CPU"] },
  { label: "Graphics Card (GPU)", keys: ["gpu", "GPU"], alwaysShow: true },
  { label: "Memory (RAM)", keys: ["ram", "Ram", "RAM"] },
  { label: "Storage (HDD / SSD)", keys: ["hdd", "HDD", "SSD"] },
  { label: "Generation", keys: ["generation", "Generation"] },
  { label: "Condition", keys: ["condition", "Condition"] },
];

const readSpecValue = (product, details, keys) => {
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    // The value can live either in the `details` object or directly on the
    // product, so both sources are checked before the key is given up on.
    const candidates = [
      details ? details[key] : undefined,
      product[key],
    ];
    for (let c = 0; c < candidates.length; c += 1) {
      const raw = candidates[c];
      if (raw !== null && raw !== undefined && String(raw).trim() !== "") {
        return String(raw).trim();
      }
    }
  }
  return "";
};

export default function ProductDetailView({ product }) {
  const [activeImage, setActiveImage] = useState("");

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const firstImage =
      product.images && product.images.length > 0
        ? typeof product.images[0] === "string"
          ? product.images[0]
          : product.images[0].imageUrl
        : noImage;
    setActiveImage(getImageUrl(firstImage));
    setImageIndex(0);
  }, [product]);

  useEffect(() => {
    if (!product.images || product.images.length <= 1) return;
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % product.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [product.images]);

  useEffect(() => {
    if (!product.images || product.images.length === 0) return;
    const current = product.images[imageIndex];
    const imgUrl = getImageUrl(
      typeof current === "string" ? current : current.imageUrl
    );
    setActiveImage(imgUrl);
  }, [imageIndex, product.images]);

  useEffect(() => {
    if (!product.images || product.images.length <= 1) return;
    const gallery = document.getElementById("product-zoom-gallery");
    if (!gallery) return;
    let scrollPosition = 0;
    const interval = setInterval(() => {
      scrollPosition += 100;
      if (scrollPosition > gallery.scrollWidth - gallery.clientWidth) {
        scrollPosition = 0;
      }
      gallery.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }, 5000);
    return () => clearInterval(interval);
  }, [product.images]);

  const { discountAmount, discountType, discountPrice } = getDiscountAmount(
    product.category,
    product
  );

  const details = product.details || {};

  // Build the specification rows. The GPU row is always rendered so the
  // customer can see that a graphics card is part of the specification sheet,
  // even when the seller has not filled the value in yet.
  const specifications = SPEC_FIELDS.map((field) => ({
    ...field,
    value: readSpecValue(product, details, field.keys),
  })).filter((field) => field.value || field.alwaysShow);

  // Any attribute that is not part of the fixed specification list is still
  // displayed, so nothing gets lost.
  const coveredKeys = SPEC_FIELDS.reduce((keys, field) => {
    field.keys.forEach((key) => keys.add(key.toLowerCase()));
    return keys;
  }, new Set());

  const extraSpecifications = Object.entries(details).filter(
    ([attribute, value]) =>
      !coveredKeys.has(attribute.toLowerCase()) &&
      value !== null &&
      value !== undefined &&
      String(value).trim() !== ""
  );

  return (
    <div className="page-content">
      <div className="container">
        <div className="product-details-top">
          <div className="row">
            <div className="col-md-6">
              <div className="product-gallery product-gallery-vertical">
                <div className="row">
                  <figure className="product-main-image">
                    <img src={activeImage} alt="product image" />
                  </figure>

                  {product.images && product.images.length > 1 && (
                    <div
                      id="product-zoom-gallery"
                      className="product-image-gallery"
                    >
                      {product.images.map((imageItem, idx) => {
                        const imgUrl = getImageUrl(
                          typeof imageItem === "string"
                            ? imageItem
                            : imageItem.imageUrl
                        );
                        return (
                          <span
                            key={idx}
                            onClick={() => {
                              setImageIndex(idx);
                              setActiveImage(imgUrl);
                            }}
                            className={`product-gallery-item cursor-pointer ${
                              imgUrl === activeImage ? "active" : ""
                            }`}
                          >
                            <img src={imgUrl} alt={`thumb-${idx}`} />
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex align-items-center">
              <div className="product-details">
                <h1 className="product-title mb-2">
                  {product.name}{" "}
                  {!product.inStock && (
                    <span className="product-price">Out of stock</span>
                  )}
                </h1>

                {discountAmount > 0 ? (
                  <div className="product-price">
                    <span className="new-price">
                      RS {discountPrice.toLocaleString()}
                    </span>

                    <span className="old-price">
                      RS {product.price.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="product-price">
                    RS {product.price.toLocaleString()}
                  </div>
                )}

                <div className="product-content">
                  <p>{product.description}</p>
                </div>

                <div className="product-specifications">
                  <h3 className="product-specifications-title">Specifications</h3>

                  <div className="product-specifications-list">
                    {specifications.map((spec) => (
                      <div className="product-detail-row product-spec-row" key={spec.label}>
                        <label>{spec.label}</label>
                        <span
                          className={
                            spec.value
                              ? "product-spec-value"
                              : "product-spec-value is-empty"
                          }
                        >
                          {spec.value || "Not specified"}
                        </span>
                      </div>
                    ))}

                    {extraSpecifications.map(([attribute, value]) => (
                      <div className="product-detail-row product-spec-row" key={attribute}>
                        <label>{attribute}</label>
                        <span className="product-spec-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="product-details-footer">
                  <div className="product-cat">
                    <span>Category:</span>
                    <Link
                      className="none-text-decoration"
                      to={{
                        pathname:
                          product.type === categoryType.Laptop
                            ? Laptops
                            : Accessories,
                        state: { category: product.category },
                      }}
                     >
                       {product.category?.name}
                     </Link>
                   </div>

                   <div className="product-cat mt-2">
                     <a
                       className="btn btn-success btn-sm"
                       href={contactInfo.whatsappUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                     >
                       <i className="icon-whatsapp" /> WhatsApp
                     </a>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

