export default function ProductTools({
  pagination,
  sortBy,
  setSortBy,
  productsLength,
  totalCount,
}) {
  return (
    <div className="toolbox">
      <div className="toolbox-left">
        <div className="toolbox-info">
          Showing{" "}
          <span>
            {productsLength} of {totalCount}
          </span>{" "}
          Products
        </div>
      </div>

      <div className="toolbox-right">
        <div className="toolbox-sort">
          <label for="sortBy">Sort by:</label>
          <div className="select-custom">
            <select
              name="sortBy"
              id="sortBy"
              className="form-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="low">Lowest Price</option>
              <option value="high">Highest Price</option>
            </select>
          </div>
        </div>
        {/* <div className="toolbox-layout">
          <a href="category-list.html" className="btn-layout">
            <svg width="16" height="10">
              <rect x="0" y="0" width="4" height="4" />
              <rect x="6" y="0" width="10" height="4" />
              <rect x="0" y="6" width="4" height="4" />
              <rect x="6" y="6" width="10" height="4" />
            </svg>
          </a>

          <a href="category-2cols.html" className="btn-layout">
            <svg width="10" height="10">
              <rect x="0" y="0" width="4" height="4" />
              <rect x="6" y="0" width="4" height="4" />
              <rect x="0" y="6" width="4" height="4" />
              <rect x="6" y="6" width="4" height="4" />
            </svg>
          </a>

          <a href="category.html" className="btn-layout">
            <svg width="16" height="10">
              <rect x="0" y="0" width="4" height="4" />
              <rect x="6" y="0" width="4" height="4" />
              <rect x="12" y="0" width="4" height="4" />
              <rect x="0" y="6" width="4" height="4" />
              <rect x="6" y="6" width="4" height="4" />
              <rect x="12" y="6" width="4" height="4" />
            </svg>
          </a>

          <a href="category-4cols.html" className="btn-layout active">
            <svg width="22" height="10">
              <rect x="0" y="0" width="4" height="4" />
              <rect x="6" y="0" width="4" height="4" />
              <rect x="12" y="0" width="4" height="4" />
              <rect x="18" y="0" width="4" height="4" />
              <rect x="0" y="6" width="4" height="4" />
              <rect x="6" y="6" width="4" height="4" />
              <rect x="12" y="6" width="4" height="4" />
              <rect x="18" y="6" width="4" height="4" />
            </svg>
          </a>
        </div> */}
      </div>
    </div>
  );
}
