import { Link } from "react-router-dom";
import { Home, Laptops, Accessories } from "../../router/routes";
import { categoryType } from "../../constants";

export default function ProductBreadCrumbs({ product }) {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
      <div className="container d-flex align-items-center">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={Home}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to={{
                pathname:
                  product.type === categoryType.Laptop ? Laptops : Accessories,
                state: null,
              }}
            >
              {product.type === categoryType.Laptop ? "Laptops" : "Accessories"}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>

        {/* <nav className="product-pager ml-auto" aria-label="Product">
          <a
            className="product-pager-link product-pager-prev"
            href="#"
            aria-label="Previous"
            tabindex="-1"
          >
            <i className="icon-angle-left"></i>
            <span>Prev</span>
          </a>

          <a
            className="product-pager-link product-pager-next"
            href="#"
            aria-label="Next"
            tabindex="-1"
          >
            <span>Next</span>
            <i className="icon-angle-right"></i>
          </a>
        </nav> */}
      </div>
    </nav>
  );
}
