import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routesList from "./routeList";
import HeaderMain from "../layouts/Header";
import Footer from "../layouts/Footer";
import { getCategoriesList } from "../services";

export default function AppRouter() {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    const list = getCategoriesList();
    setCategories(list);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Router>
      <HeaderMain categories={categories} />
      <Switch>
        {routesList.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            exact
            component={item.component}
          />
        ))}
      </Switch>
      <Footer categories={categories} />
    </Router>
  );
}
