import React from "react";

/**
 * Compact specification line (CPU / RAM / GPU) shown on the product cards.
 * Only the specs that are actually filled in are rendered.
 */
export default function ProductSpecs({ product, className = "" }) {
  if (!product) return null;

  const specs = [
    { label: "CPU", value: product.cpu },
    { label: "RAM", value: product.ram },
    { label: "GPU", value: product.gpu },
  ].filter((spec) => spec.value);

  if (!specs.length) return null;

  return (
    <div className={`product-specs ${className}`.trim()}>
      {specs.map((spec) => (
        <span className="product-spec" key={spec.label}>
          <span className="product-spec-label">{spec.label}</span>
          <span className="product-spec-value">{spec.value}</span>
        </span>
      ))}
    </div>
  );
}
