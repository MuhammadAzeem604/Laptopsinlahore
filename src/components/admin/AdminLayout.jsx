import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function AdminLayout({ children }) {
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    history.push("/admin/login");
  };

  const navClass = (path) =>
    location.pathname === path ? "admin-nav-active" : undefined;

  return (
    // `.page-wrapper` + `.main` + `.page-content` is the skeleton the Molla
    // theme (src/assets/css/main.css) expects, without it the flex layout of
    // the panel collapses and the theme styles do not apply.
    <div className="page-wrapper admin-layout">
      <header className="header admin-header">
        <div className="container">
          <Link to="/admin/products" className="admin-brand">
            LIL Admin
            <span className="admin-brand-badge">Panel</span>
          </Link>
          <nav>
            <ul className="admin-nav">
              <li className={navClass("/admin/products")}>
                <Link to="/admin/products">Products</Link>
              </li>
              <li className={navClass("/admin/products/add")}>
                <Link to="/admin/products/add">Add Product</Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="page-content">
          <div className="container">{children}</div>
        </div>
      </main>
    </div>
  );
}
