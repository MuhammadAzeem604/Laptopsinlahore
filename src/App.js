import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLogin from "./components/admin/AdminLogin";
import ProductListAdmin from "./components/admin/ProductListAdmin";
import ProductForm from "./components/admin/ProductForm";

const AdminRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("adminAuth") === "true";
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/admin/login" />
      }
    />
  );
};

function App() {
  return (
    <Router>
      <Switch>
        {/*
          The admin panel brings its own layout (AdminLayout), so it is listed
          before the public layout and never receives the customer header and
          footer.
        */}
        <Route exact path="/admin/login" component={AdminLogin} />
        <AdminRoute exact path="/admin/products" component={ProductListAdmin} />
        <AdminRoute exact path="/admin/products/add" component={ProductForm} />
        <AdminRoute exact path="/admin/products/edit/:id" component={ProductForm} />

        {/*
          Every other page is a public page and is wrapped by PublicLayout,
          which renders the header (top bar with call / facebook / whatsapp,
          the search bar and the navigation) and the footer.
        */}
        <Route path="/" component={PublicLayout} />
      </Switch>
    </Router>
  );
}

export default App;
