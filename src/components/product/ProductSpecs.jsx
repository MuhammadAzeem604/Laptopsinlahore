import React from "react";

/**
 * Compact specification line (CPU / RAM / GPU) shown on the product cards.
 * Values are read from both the product root and its details object to keep
 * cards consistent across different data shapes.
 */
const readValue = (product, keys) => {
  if (!product) return "";
  const details = product.details || {};

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const candidates = [details[key], product[key]];

    for (let c = 0; c < candidates.length; c += 1) {
      const raw = candidates[c];
      if (raw !== null && raw !== undefined && String(raw).trim() !== "") {
        return String(raw).trim();
      }
    }
  }
  return "";
};

export default function ProductSpecs({ product, className = "" }) {
  if (!product) return null;

  const specs = [
    { label: "CPU", keys: ["cpu", "CPU"], value: readValue(product, ["cpu", "CPU"]) },
    { label: "RAM", keys: ["ram", "Ram", "RAM"], value: readValue(product, ["ram", "Ram", "RAM"]), alwaysShow: true },
    { label: "GPU", keys: ["gpu", "GPU"], value: readValue(product, ["gpu", "GPU"]), alwaysShow: true },
  ].filter((spec) => spec.value || spec.alwaysShow);

  if (!specs.length) return null;

  return (
    <div className={`product-specs ${className}`.trim()}>
      {specs.map((spec) => (
        <span className="product-spec" key={spec.label}>
          <span className="product-spec-label">{spec.label}</span>
          <span
            className={`product-spec-value ${
              spec.value ? "" : "is-empty"
            }`.trim()}
          >
            {spec.value || "Not specified"}
          </span>
        </span>
      ))}
    </div>
  );
}
