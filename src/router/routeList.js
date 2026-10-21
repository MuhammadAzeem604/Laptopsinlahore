import HomeComponent from "../views/home";
import LaptopComponent from "../views/Laptops";
import AccessoriesComponent from "../views/accessories";
import ProductComponent from "../views/product";
import AboutUsComponent from "../views/aboutUs";

import { Home, Laptops, Accessories, ProductDetails, AboutUs } from "./routes";

const routesList = [
  {
    path: "/",
    title: "Login",
    component: HomeComponent,
  },
  {
    path: Home,
    title: "Home",
    component: HomeComponent,
  },
  {
    path: Laptops,
    title: "Laptops",
    component: LaptopComponent,
  },
  {
    path: Accessories,
    title: "Accessories",
    component: AccessoriesComponent,
  },
  {
    path: ProductDetails,
    title: "Product Details",
    component: ProductComponent,
  },
  {
    path: AboutUs,
    title: "About Us",
    component: AboutUsComponent,
  },
];

export default routesList;
