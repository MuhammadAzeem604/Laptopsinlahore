import { Link } from "react-router-dom";
import { Laptops } from "../../router/routes";

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
          <span className="lil-hero__badge">New Arrival</span>
          <h1 className="lil-hero__title">Laptops on Sale in Lahore</h1>
          <p className="lil-hero__subtitle">
            Find Your Perfect Laptop in Lahore
          </p>
          <p className="lil-section__sub">
            Pick a brand to see what we have in stock right now - from everyday
            second hand machines to brand new laptops
          </p>
          <Link to={Laptops} className="lil-hero__cta">
            Shop Now <span className="lil-hero__cta-arrow">→</span>
          </Link>
        </div>
        <div className="lil-hero__media">
          <img src="/homebanner.png" alt="Laptops on sale in Lahore" />
        </div>
      </div>
    </section>
  );
}
