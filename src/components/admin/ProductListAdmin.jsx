import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import {
  getAllProductsAdmin,
  deleteProduct,
} from "../../services/actions/products";
import { getImageUrl } from "../../utils/imageUrl";

export default function ProductListAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllProductsAdmin();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        setError(err?.message || "Failed to delete product");
      }
    }
  };

  return (
    <AdminLayout>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="admin-page-head">
        <h2 className="title">Products</h2>
        <Link to="/admin/products/add" className="btn btn-primary btn-rounded">
          <span>Add Product</span>
        </Link>
      </div>
      {loading ? (
        <div className="admin-table-wrapper">
          <div className="admin-empty">Loading...</div>
        </div>
      ) : products.length === 0 ? (
        <div className="admin-table-wrapper">
          <div className="admin-empty">No products found.</div>
        </div>
      ) : (
        <div className="admin-table-wrapper table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>CPU</th>
                <th>GPU</th>
                <th>Type</th>
                <th>Category</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={getImageUrl(
                          typeof product.images[0] === "string"
                            ? product.images[0]
                            : product.images[0].imageUrl
                        )}
                        alt={product.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          background: "#eee",
                        }}
                      />
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>Rs. {product.price?.toLocaleString()}</td>
                  <td>{product.cpu || "-"}</td>
                  <td>{product.gpu || "-"}</td>
                  <td>{product.type}</td>
                  <td>{product.category?.name}</td>
                  <td>{product.active ? "Yes" : "No"}</td>
                  <td>
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="btn btn-outline-primary-2 btn-sm mr-2"
                      style={{ marginBottom: "5px" }}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
