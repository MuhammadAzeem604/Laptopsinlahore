import TopSearchBar from "./TopSearchBar";
import TopContactBar from "./TopContactBar";
import TopNavBAr from "./TopNavBar";
import MobileNavbar from "./MobileMenu";
import { Laptops, Accessories } from "../router/routes";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { categoryType } from "../constants";

export default function HeaderMain({ categories }) {
  const history = useHistory();

  const [toggle, setToggle] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState(categoryType.Laptop);
  const [showClear, setShowClear] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const routeTo = type === categoryType.Laptop ? Laptops : Accessories;
    history.push({
      pathname: routeTo,
      state: { search },
    });
    setShowClear(true);
  };

  const resetSearch = () => {
    setSearch("");
    setType(categoryType.Laptop);
    setShowClear(false);
  };

  const handleSearchClear = () => {
    setSearch("");
    const routeTo = type === categoryType.Laptop ? Laptops : Accessories;
    history.push({
      pathname: routeTo,
      state: null,
    });
    setShowClear(false);
  };

  return (
    <header className="header header-intro-clearance header-4">
      <TopContactBar />
      <TopSearchBar
        categories={categories}
        search={search}
        type={type}
        setSearch={setSearch}
        setType={setType}
        handleSearch={handleSearch}
        setToggle={setToggle}
        showClear={showClear}
        handleSearchClear={handleSearchClear}
      />

      <TopNavBAr categories={categories} resetSearch={resetSearch} />
      <MobileNavbar
        categories={categories}
        search={search}
        type={type}
        setSearch={setSearch}
        setType={setType}
        handleSearch={handleSearch}
        toggle={toggle}
        setToggle={setToggle}
        resetSearch={resetSearch}
      />
    </header>
  );
}
