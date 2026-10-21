import { Link } from "react-router-dom";
import React from "react";
import { categoryType } from "../constants";
import { Home } from "../router/routes";
import { getPublicAsset } from "../utils/imageUrl";

export default function TopSearchBar({
  search,
  type,
  setSearch,
  setType,
  handleSearch,
  setToggle,
  showClear,
  handleSearchClear,
}) {
  return (
    <div className="header-middle">
      <div className="container">
        <div className="header-left">
          <button
            className="mobile-menu-toggler"
            onClick={() => setToggle(false)}
          >
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>

          <Link to={Home} className="logo">
            {/* the logo is a plain file in /public -> the url never changes */}
            <img
              className="site-logo"
              src={getPublicAsset("IMG_5206.jpg")}
              alt="Lahore Laptops"
            />
          </Link>
        </div>

        <div className="header-center-custom">
          <div className="header-search-custom">
            <form className="search-form" onSubmit={handleSearch}>
              <div className="header-search-wrapper select-search">
                <select
                  className="form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={categoryType.Laptop}>Laptops</option>
                  <option value={categoryType.Accessories}>Accessories</option>
                </select>
              </div>
              <div className="header-search-wrapper search-wrapper-wide type-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  required
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {showClear && (
                  <span
                    onClick={handleSearchClear}
                    className="clear-search cursor-pointer"
                  >
                    Reset
                  </span>
                )}
              </div>
              <div className="search-submit">
                <button className="" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
