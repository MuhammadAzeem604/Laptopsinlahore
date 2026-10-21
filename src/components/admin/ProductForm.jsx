import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { createProduct, getProduct, updateProduct } from "../../services/actions/products";
import { getCategoriesList } from "../../services/actions/categories";
import { getImageUrl } from "../../utils/imageUrl";
import { discountTypes } from "../../constants";

/**
 * The API expects the multipart form fields in PascalCase
 * (see swagger: POST /api/Products). ASP.NET binds case-insensitively, but the
 * explicit mapping keeps the contract obvious and avoids surprises.
 */
const API_FIELDS = {
  name: "Name",
  price: "Price",
  categoryId: "CategoryId",
  type: "Type",
  active: "Active",
  isNewArrival: "IsNewArrival",
  inStock: "InStock",
  description: "Description",
  discount: "Discount",
  discountType: "DiscountType",
  series: "Series",
  model: "Model",
  cpu: "CPU",
  gpu: "Gpu",
  generation: "Generation",
  ram: "Ram",
  hdd: "HDD",
  condition: "Condition",
};

// Fields the API binds to a number. Sending "" for these makes the API
// answer with 400 (The value '' is not valid for ...).
const NUMERIC_FIELDS = ["price", "categoryId", "discount"];

const EMPTY_FORM = {
  name: "",
  price: "",
  categoryId: "",
  type: "laptop",
  active: true,
  isNewArrival: false,
  inStock: true,
  description: "",
  discount: 0,
  discountType: discountTypes.percentage,
  series: "",
  model: "",
  cpu: "",
  gpu: "",
  generation: "",
  ram: "",
  hdd: "",
  condition: "",
};

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const history = useHistory();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // release the object URLs created for the previews
  useEffect(() => {
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

  const fetchCategories = useCallback(async () => {
    const data = await getCategoriesList("all");
    setCategories(Array.isArray(data) ? data : []);
  }, []);

  const fetchProduct = useCallback(async () => {
    const product = await getProduct(id);
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price ?? "",
        categoryId: product.categoryId ?? "",
        type: product.type || "laptop",
        active: product.active ?? true,
        isNewArrival: product.isNewArrival ?? false,
        inStock: product.inStock ?? true,
        description: product.description || "",
        discount: product.discount ?? 0,
        discountType: product.discountType || discountTypes.percentage,
        series: product.series || "",
        model: product.model || "",
        cpu: product.cpu || "",
        gpu: product.gpu || "",
        generation: product.generation || "",
        ram: product.ram || "",
        hdd: product.hdd || "",
        condition: product.condition || "",
      });
      setExistingImages(product.images || []);
    }
  }, [id]);

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchProduct();
    }
  }, [isEdit, fetchCategories, fetchProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // switching the product type invalidates the selected category
  const handleTypeChange = (e) => {
    const type = e.target.value;
    setFormData((prev) => {
      const selected = categories.find(
        (cat) => String(cat.id) === String(prev.categoryId)
      );
      const isStillValid = selected && selected.type === type;
      return {
        ...prev,
        type,
        categoryId: isStillValid ? prev.categoryId : "",
      };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const removeExistingImage = (url) => {
    setExistingImages((prev) =>
      prev.filter((img) => (typeof img === "string" ? img !== url : img.imageUrl !== url))
    );
  };

  // only offer the categories that belong to the selected product type
  const visibleCategories = useMemo(() => {
    if (!categories.length) return [];
    return categories.filter((cat) => cat.type === formData.type);
  }, [categories, formData.type]);

  const buildFormData = () => {
    const data = new FormData();

    Object.entries(API_FIELDS).forEach(([key, apiName]) => {
      const raw = formData[key];

      if (NUMERIC_FIELDS.includes(key)) {
        const value = raw === "" || raw === null || raw === undefined ? 0 : Number(raw);
        data.append(apiName, Number.isFinite(value) ? value : 0);
        return;
      }

      if (typeof raw === "boolean") {
        data.append(apiName, raw ? "true" : "false");
        return;
      }

      data.append(apiName, raw === null || raw === undefined ? "" : raw);
    });

    imageFiles.forEach((file) => {
      data.append("ImageFiles", file);
    });

    if (isEdit) {
      existingImages.forEach((img) => {
        const url = typeof img === "string" ? img : img.imageUrl;
        if (url) data.append("ExistingImageUrls", url);
      });
    }

    return data;
  };

  const validate = () => {
    if (!formData.name.trim()) return "Product name is required.";
    if (formData.price === "" || Number(formData.price) <= 0)
      return "A valid price is required.";
    if (!formData.categoryId) return "Please select a category.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const data = buildFormData();

    try {
      if (isEdit) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }
      history.push("/admin/products");
    } catch (err) {
      setError(err?.message || "Failed to save product");
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-head">
        <h2 className="title">{isEdit ? "Edit Product" : "Add Product"}</h2>
        <Link to="/admin/products" className="btn btn-outline-primary-2">
          Back to Products
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="admin-name">
              Name *
            </label>
            <input
              id="admin-name"
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="admin-price">
              Price *
            </label>
            <input
              id="admin-price"
              type="number"
              min="0"
              step="any"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="admin-type">
              Type *
            </label>
            <select
              id="admin-type"
              name="type"
              className="custom-select"
              value={formData.type}
              onChange={handleTypeChange}
              required
            >
              <option value="laptop">Laptop</option>
              <option value="accessory">Accessory</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="admin-category">
              Category *
            </label>
            <select
              id="admin-category"
              name="categoryId"
              className="custom-select"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {visibleCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2 mb-3">
            <label className="form-label" htmlFor="admin-discount">
              Discount
            </label>
            <input
              id="admin-discount"
              type="number"
              min="0"
              step="any"
              name="discount"
              className="form-control"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 mb-3">
            <label className="form-label" htmlFor="admin-discount-type">
              Discount Type
            </label>
            <select
              id="admin-discount-type"
              name="discountType"
              className="custom-select"
              value={formData.discountType}
              onChange={handleChange}
            >
              <option value={discountTypes.percentage}>Percentage</option>
              <option value={discountTypes.amount}>Amount</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="admin-description">
            Description
          </label>
          <textarea
            id="admin-description"
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="active"
                className="form-check-input"
                checked={formData.active}
                onChange={handleChange}
              />
              <label className="form-check-label">Active</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="isNewArrival"
                className="form-check-input"
                checked={formData.isNewArrival}
                onChange={handleChange}
              />
              <label className="form-check-label">New Arrival</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="inStock"
                className="form-check-input"
                checked={formData.inStock}
                onChange={handleChange}
              />
              <label className="form-check-label">In Stock</label>
            </div>
          </div>
        </div>

        <h4 className="title mb-3" style={{ fontSize: "1.8rem" }}>
          Product Details
        </h4>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="admin-series">
              Series
            </label>
            <input
              id="admin-series"
              type="text"
              name="series"
              className="form-control"
              value={formData.series}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="admin-model">
              Model
            </label>
            <input
              id="admin-model"
              type="text"
              name="model"
              className="form-control"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="admin-cpu">
              CPU
            </label>
            <input
              id="admin-cpu"
              type="text"
              name="cpu"
              className="form-control"
              value={formData.cpu}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="admin-gpu">
              Graphics Card (GPU)
            </label>
            <input
              id="admin-gpu"
              type="text"
              name="gpu"
              className="form-control"
              placeholder="e.g. NVIDIA GeForce RTX 3050"
              value={formData.gpu}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="admin-generation">
              Generation
            </label>
            <input
              id="admin-generation"
              type="text"
              name="generation"
              className="form-control"
              value={formData.generation}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="admin-ram">
              RAM
            </label>
            <input
              id="admin-ram"
              type="text"
              name="ram"
              className="form-control"
              value={formData.ram}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="admin-hdd">
              HDD / SSD
            </label>
            <input
              id="admin-hdd"
              type="text"
              name="hdd"
              className="form-control"
              value={formData.hdd}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="admin-condition">
              Condition
            </label>
            <input
              id="admin-condition"
              type="text"
              name="condition"
              className="form-control"
              value={formData.condition}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="admin-images">
            Product Images
          </label>
          <input
            id="admin-images"
            type="file"
            className="form-control"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {existingImages.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Existing Images</label>
            <div className="admin-image-grid">
              {existingImages.map((img, idx) => {
                const url = getImageUrl(
                  typeof img === "string" ? img : img.imageUrl
                );
                return (
                  <div key={idx} className="admin-image-item">
                    <img src={url} alt="existing" />
                    <button
                      type="button"
                      className="admin-image-remove"
                      onClick={() =>
                        removeExistingImage(
                          typeof img === "string" ? img : img.imageUrl
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {previewUrls.length > 0 && (
          <div className="mb-3">
            <label className="form-label">New Images Preview</label>
            <div className="admin-image-grid">
              {previewUrls.map((url, idx) => (
                <img key={idx} src={url} alt="preview" />
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <button type="submit" className="btn btn-primary mr-2" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/admin/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
