import { Link } from "react-router-dom";
import { Laptops, Accessories } from "../../router/routes";

/**
 * Hero of the home page.
 *
 * Text on the left, image on the right.
 */
export default function HomeBanner() {
  return (
    <section className="lil-hero">
      <div className="lil-hero__inner">
        <div className="lil-hero__content">
          <span className="lil-hero__badge" style={{ backgroundColor: "#f7f7ed" }}>New Arrival</span>
          <h1 className="lil-hero__title">Buy New & Used Laptops in Lahore, Pakistan at Best Prices</h1>
          <p className="lil-hero__subtitle">
            Find Your Perfect Laptop in Lahore
          </p>
          <p className="lil-section__sub">
          Shop new and used laptops in Lahore at the best prices. Explore HP, Dell, Lenovo, Acer and Apple MacBook laptops at affordable rates.
          </p>
          <div className="lil-hero__actions">
            <Link to={Laptops} className="lil-hero__cta">
              Shop Laptops <span className="lil-hero__cta-arrow">→</span>
            </Link>
            <Link to={Accessories} className="lil-hero__cta">
            Parts & Accessories <span className="lil-hero__cta-arrow">→</span>
            </Link>
          </div>
          <p className="lil-section__sub" style={{ marginTop: "15px" }}>
            Buy Laptops, Chargers, RAM, SSDs, Hard Drives & More
          </p>
        </div>
        <div className="lil-hero__media">
          <img src="/banner.jpeg" alt="Laptops on sale in Lahore" />
        </div>
      </div>
    </section>
  );
}
