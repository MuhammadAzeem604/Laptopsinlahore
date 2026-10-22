import { Link } from "react-router-dom";
import { Laptops } from "../../router/routes";

/**
 * Hero of the home page.
 *
 * Edge-to-edge clickable image linking to the laptops page.
 */
export default function HomeBanner() {
  return (
    <section className="lil-hero">
      <Link to={Laptops} className="lil-hero__link">
        <div className="lil-hero__media">
          <img src="/IMG_5241.JPG.jpeg" alt="Laptops on sale in Lahore" />
        </div>
      </Link>
    </section>
  );
}
