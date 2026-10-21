import Product from "./product";
import ProductCategories from "./ProductCategories";
import ProductPagination from "./ProductPagination";
import ProductPriceFilter from "./ProductPriceFilter";
import ProductTools from "./ProductsTools";
import React, { useState, useEffect } from "react";
import { getCategoriesList } from "../../services";
import { useHistory } from "react-router-dom";
import ProductBanner from "./index";
import { categoryType } from "../../constants";
import { Link } from "react-router-dom";
import { Laptops, Accessories } from "../../router/routes";
import { getProductsList } from "../../services";

export default function ProductList({ productType }) {
  const history = useHistory();

  const defaultPagination = {
    page: 1,
    perPage: 8,
  };

  const [categoriesActive, setCategoriesActive] = useState("");
  const [priceActive, setPriceActive] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("low");
  const [priceRange, setPriceRange] = useState([0, 500_000]);
  const [categories, setCategories] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    ...defaultPagination,
  });

  const getCategories = async () => {
    const list = await getCategoriesList(productType);
    setCategories(list);
  };
  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    setPagination({ ...defaultPagination });
  };
  const updateRange = (event, newValue) => {
    setPriceRange(newValue);
    setPagination({ ...defaultPagination });
  };
  const handleCleanFilter = () => {
    setPriceRange([0, 500_000]);
    setPriceActive("");
  };
  const handleSortByChange = (value) => {
    setSortBy(value);
    setPagination({ ...defaultPagination });
  };

  useEffect(() => {
    getCategories();
  }, [productType]);

  useEffect(() => {
    const locationState = history.location.state;
    const searchState = locationState?.search ?? "";
    const category = locationState?.category ?? null;
    setSelectedCategory(category ? category.id : "");
    setCategoriesActive(category ? "0" : "");
    setSearch(searchState);
    setPriceRange([0, 500_000]);
    setPagination({ ...defaultPagination });
  }, [history.location]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { list, paginationDetail } = await getProductsList(
        productType,
        search,
        selectedCategory,
        priceRange,
        sortBy,
        pagination
      );
      setProductsList(list || []);
      setTotalCount(paginationDetail?.total || 0);
    };
    fetchProducts();
  }, [productType, search, selectedCategory, priceRange, sortBy, pagination]);

  return (
    <>
      <ProductBanner
        title={productType === categoryType.Laptop ? "Laptops" : "Accessories"}
        search={search}
      />

      <div className="page-content">
        <div className="container">
          <div className="row">
            <aside className="col-lg-3 order-lg-first">
              <div className="sidebar sidebar-shop">
                <div className="widget widget-clean">
                  <label>Filters:</label>
                  <Link
                    to={{
                      pathname:
                        productType === categoryType.Laptop
                          ? Laptops
                          : Accessories,
                      state: { search },
                    }}
                    onClick={handleCleanFilter}
                    className="sidebar-filter-clear"
                  >
                    Clean All
                  </Link>
                </div>
                <ProductCategories
                  categories={categories}
                  productType={productType}
                  selectedCategory={selectedCategory}
                  onSelect={handleCategorySelect}
                  active={categoriesActive}
                  setActive={setCategoriesActive}
                />
                <ProductPriceFilter
                  active={priceActive}
                  setActive={setPriceActive}
                  value={priceRange}
                  updateRange={updateRange}
                />
              </div>
            </aside>
            <div className="col-lg-9">
              <ProductTools
                sortBy={sortBy}
                setSortBy={handleSortByChange}
                pagination={pagination}
                totalCount={totalCount}
                productsLength={productsList.length}
              />
              <Product
                productsList={productsList}
                productTypeLabel={
                  productType === categoryType.Laptop ? "Laptop" : "Accessories"
                }
              />
              {productsList.length > 0 && (
                <ProductPagination
                  pagination={pagination}
                  totalCount={totalCount}
                  setTotalCount={setTotalCount}
                  setPagination={setPagination}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
