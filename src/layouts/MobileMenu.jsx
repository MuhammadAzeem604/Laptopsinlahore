import { categoryType } from "../constants";
import { useState } from "react";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Home, Laptops, Accessories } from "../router/routes";

export default function MobileNavbar({
  search,
  type,
  setSearch,
  setType,
  handleSearch,
  toggle,
  setToggle,
  categories,
  resetSearch,
}) {
  const [active, setActive] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setToggle(true);
    handleSearch(e);
  };

  const HandleMenuClick = () => {
    resetSearch();
    setToggle(true);
  };

  return (
    <>
      <div
        className={`mobile-menu-overlay ${
          toggle ? "" : "custom-show-mobile-menu-overlay"
        }`}
      />

      <div
        className={`mobile-menu-container mobile-menu-light ${
          toggle ? "" : "custom-show-mobile-menu-sider"
        }`}
      >
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close" onClick={() => setToggle(true)}>
            <i className="icon-close" />
          </span>

          {/* <form onSubmit={onSubmit} className="mobile-search">
            <label for="mobile-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              className="form-control"
              name="mobile-search"
              placeholder="Search..."
              required
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div>
              <select
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value={categoryType.Laptop}>Laptops</option>
                <option value={categoryType.Accessories}>Accessories</option>
              </select>
            </div>

            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </form> */}
          <nav className="mobile-nav">
            <ul className="mobile-menu">
              <li>
                <Link to={Home} onClick={HandleMenuClick}>
                  Home
                </Link>
              </li>

              <Accordion activeKey={active}>
                <div>
                  <Link
                    to={{
                      pathname: Laptops,
                      state: null,
                    }}
                    onClick={HandleMenuClick}
                  >
                    Laptops
                  </Link>
                  <div className="float-right">
                    <i
                      onClick={() => {
                        setActive(active === "0" ? "" : "0");
                      }}
                      className={
                        active === "0" ? "icon-angle-up" : "icon-angle-down"
                      }
                    />
                  </div>

                  <Accordion.Collapse eventKey="0">
                    <ul>
                      {categories.map(
                        (item, index) =>
                          item.type === categoryType.Laptop && (
                            <li key={index}>
                              <Link
                                to={{
                                  pathname: Laptops,
                                  state: { category: item },
                                }}
                                onClick={HandleMenuClick}
                              >
                                {item.name}
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  </Accordion.Collapse>
                </div>

                <div>
                  <Link
                    to={{
                      pathname: Accessories,
                      state: null,
                    }}
                    onClick={HandleMenuClick}
                  >
                    Accessories
                  </Link>
                  <div className="float-right">
                    <i
                      onClick={() => setActive(active === "1" ? "" : "1")}
                      className={
                        active === "1" ? "icon-angle-up" : "icon-angle-down"
                      }
                    />
                  </div>

                  <Accordion.Collapse eventKey="1">
                    <ul>
                      {categories.map(
                        (item, index) =>
                          item.type === categoryType.Accessories && (
                            <li key={index}>
                              <Link
                                to={{
                                  pathname: Accessories,
                                  state: { category: item },
                                }}
                                onClick={HandleMenuClick}
                              >
                                {item.name}
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  </Accordion.Collapse>
                </div>
              </Accordion>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
