import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import loginBg from "../../assets/images/bg-1.jpg";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      history.push("/admin/products");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    // Same skeleton the Molla theme expects on every page.
    <div className="page-wrapper admin-layout">
      <main className="main">
        <div
          className="login-page bg-image"
          style={{ backgroundImage: `url(${loginBg})` }}
        >
          <div className="login-overlay" />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="form-box">
                  <div className="form-tab">
                    <h4 className="title text-center">Admin Login</h4>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="admin-username">
                          Username
                        </label>
                        <input
                          id="admin-username"
                          type="text"
                          className="form-control"
                          value={credentials.username}
                          onChange={(e) =>
                            setCredentials({ ...credentials, username: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="admin-password">
                          Password
                        </label>
                        <input
                          id="admin-password"
                          type="password"
                          className="form-control"
                          value={credentials.password}
                          onChange={(e) =>
                            setCredentials({ ...credentials, password: e.target.value })
                          }
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-outline-primary-2 btn-order btn-block"
                      >
                        Login
                      </button>
                    </form>
                    <p className="text-center mt-3" style={{ fontSize: "12px" }}>
                      Default: admin / admin123
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
