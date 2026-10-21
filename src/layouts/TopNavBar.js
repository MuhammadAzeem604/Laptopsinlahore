import { Link, NavLink } from "react-router-dom";
import { LaptopImage } from "../utils/images";
import { Home, Laptops, Accessories } from "../router/routes";
import { categoryType } from "../constants";

export default function TopNavBAr({ categories, resetSearch }) {
  const onMenuClick = () => {
    resetSearch();
  };

  return (
    <div className="header-bottom sticky-header">
      <div className="container">
        <div className="header-left">
          <div className="dropdown category-dropdown">
            <span
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
              title="All Categories"
            >
              All Categories <i className="icon-angle-down" />
            </span>

            <div className="dropdown-menu">
              <nav className="side-nav">
                <ul className="menu-vertical sf-arrows">
                  <li className="item-lead">
                    <Link
                      to={{
                        pathname: Laptops,
                        state: null,
                      }}
                      onClick={onMenuClick}
                    >
                      Laptops
                    </Link>
                  </li>
                  {categories.map(
                    (item, index) =>
                      item.type === categoryType.Laptop && (
                        <li key={index}>
                          <Link
                            to={{
                              pathname: Laptops,
                              state: { category: item },
                            }}
                            onClick={onMenuClick}
                          >
                            {item.name}
                          </Link>
                        </li>
                      )
                  )}
                  <li className="item-lead">
                    <Link
                      to={{
                        pathname: Accessories,
                        state: null,
                      }}
                      onClick={onMenuClick}
                    >
                      Accessories
                    </Link>
                  </li>
                  {categories.map(
                    (item, index) =>
                      item.type === categoryType.Accessories && (
                        <li key={index}>
                          <Link
                            to={{
                              pathname: Accessories,
                              state: { category: item },
                            }}
                            onClick={onMenuClick}
                          >
                            {item.name}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="header-center">
          <nav className="main-nav">
            <ul className="menu sf-arrows">
              <li className="megamenu-container">
                <NavLink to={Home} onClick={onMenuClick}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={{
                    pathname: Laptops,
                    state: null,
                  }}
                  onClick={onMenuClick}
                  className="sf-with-ul"
                >
                  Laptops
                </NavLink>

                <div
                  className="megamenu megamenu-md"
                  style={{ width: "500px" }}
                >
                  <div className="row no-gutters">
                    <div className="col-md-8">
                      <div className="menu-col">
                        <div className="row">
                          {categories.map(
                            (item, index) =>
                              item.type === categoryType.Laptop && (
                                <div className="col-md-6" key={index}>
                                  <li>
                                    <Link
                                      to={{
                                        pathname: Laptops,
                                        state: { category: item },
                                      }}
                                      onClick={onMenuClick}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="banner banner-overlay">
                        <span className="banner banner-menu">
                          <img src={LaptopImage} alt="Banner" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <NavLink
                  to={{
                    pathname: Accessories,
                    state: null,
                  }}
                  onClick={onMenuClick}
                  className="sf-with-ul"
                >
                  Accessories
                </NavLink>

                <div
                  className="megamenu megamenu-sm"
                  style={{ width: "200px" }}
                >
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="menu-col">
                        <div className="row">
                          {categories.map(
                            (item, index) =>
                              item.type === categoryType.Accessories && (
                                <div className="col-md-12" key={index}>
                                  <li>
                                    <Link
                                      to={{
                                        pathname: Accessories,
                                        state: { category: item },
                                      }}
                                      onClick={onMenuClick}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
