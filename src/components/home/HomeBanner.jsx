import { Link } from "react-router-dom";
import { Laptops, Accessories } from "../../router/routes";
import bannerImage from "../../assets/images/slide-1.jpg";

/**
 * Hero of the home page.
 *
 * Own layout (not the theme slider): text + call to action on the left,
 * the shop photo on the right.
 */
export default function HomeBanner() {
  return (
    <section className="lil-hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <span className="lil-hero__badge">
              <i className="icon-map-marker" /> Lahore & Pakistan
            </span>

            <h1 className="lil-hero__title">
              New & Used <span>Laptops</span> in Lahore
            </h1>

            <p className="lil-hero__text">
              Budget, business, gaming and MacBook machines from the brands you
              trust. Every laptop is opened, tested and cleaned in our Gulberg
              workshop before it goes to the counter - so you buy a working
              machine, not a box of parts.
            </p>

            <div className="lil-hero__actions">
              <Link to={Laptops} className="lil-btn lil-btn--primary">
                Shop Laptops
              </Link>
              <Link to={Accessories} className="lil-btn lil-btn--outline">
                Parts & Accessories
              </Link>
            </div>

            <ul className="lil-hero__facts">
              <li>
                <i className="icon-check" /> Tested before delivery
              </li>
              <li>
                <i className="icon-check" /> Cash & online payment
              </li>
              <li>
                <i className="icon-check" /> 10+ brands in stock
              </li>
            </ul>
          </div>

          <div className="col-lg-6 mt-4 mt-lg-0">
            <div className="lil-hero__media">
              <img src={bannerImage} alt="Laptops on sale in Lahore" />
              <div className="lil-hero__tag">
                <strong>10+</strong>
                <span>Brands in stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
