import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { getCategoriesList } from "../services";
import {
  Home as HomePath,
  Laptops as LaptopsPath,
  Accessories as AccessoriesPath,
  AboutUs as AboutUsPath,
} from "../router/routes";
import Home from "../views/home";
import Laptops from "../views/Laptops";
import Accessories from "../views/accessories";
import AboutUs from "../views/aboutUs";
import ProductDetail from "../views/product";

/**
 * Layout of every public (customer facing) page.
 *
 * It renders the same three blocks as the live site
 * (https://www.laptopinlahore.pk):
 *   1. the header  -> top contact bar (call / facebook / whatsapp), the search
 *      bar and the category navigation
 *   2. the page content
 *   3. the footer  -> the shop locations
 *
 * The categories are loaded once here and handed over to the header and the
 * footer, so both stay in sync with the navigation.
 */
export default function PublicLayout() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;

    getCategoriesList().then((data) => {
      if (isMounted) {
        setCategories(Array.isArray(data) ? data : []);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Header categories={categories} />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path={HomePath} component={Home} />
        <Route exact path={LaptopsPath} component={Laptops} />
        <Route exact path={AccessoriesPath} component={Accessories} />
        <Route exact path={AboutUsPath} component={AboutUs} />
        <Route exact path="/productDetails/:id" component={ProductDetail} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Redirect to="/" />
      </Switch>

      <Footer categories={categories} />
    </>
  );
}
