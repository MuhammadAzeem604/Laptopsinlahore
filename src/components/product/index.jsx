export default function ProductBanner({ title, search }) {
  return (
    <div className="page-header text-center product-banner">
      <div className="container">
        <h1 className="page-title">
          {/* Laptop's<span>Shop</span> */}
          {title}
        </h1>
        {search && (
          <div className="search-results">Search results for: {search}</div>
        )}
      </div>
    </div>
  );
}
