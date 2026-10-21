import { Link } from "react-router-dom";
import { Laptops, Accessories, AboutUs } from "../../router/routes";
import { contactInfo } from "../../constants/contact";

/**
 * Quick links strip: the three things a visitor usually wants - a laptop,
 * a spare part, or a way to reach the shop.
 */
export default function ShopLinks() {
  return (
    <section className="lil-section lil-section--tight">
      <div className="container">
        <div className="lil-quicklinks">
          <Link className="lil-quicklink" to={Laptops}>
            <span className="lil-quicklink__icon">
              <i className="icon-bars" />
            </span>
            <span>
              <span className="lil-quicklink__title">All laptops</span>
              <span className="lil-quicklink__text">
                New and used, filtered by brand and price
              </span>
            </span>
          </Link>

          <Link className="lil-quicklink" to={Accessories}>
            <span className="lil-quicklink__icon">
              <i className="icon-truck" />
            </span>
            <span>
              <span className="lil-quicklink__title">Parts & accessories</span>
              <span className="lil-quicklink__text">
                Chargers, RAM, SSDs and other spares
              </span>
            </span>
          </Link>

          <Link className="lil-quicklink" to={AboutUs}>
            <span className="lil-quicklink__icon">
              <i className="icon-map-marker" />
            </span>
            <span>
              <span className="lil-quicklink__title">Visit our shop</span>
              <span className="lil-quicklink__text">
                Gulberg, Lahore - open 11am to 9pm
              </span>
            </span>
          </Link>

          <a className="lil-quicklink" href={contactInfo.whatsappUrl}>
            <span className="lil-quicklink__icon">
              <i className="icon-whatsapp" />
            </span>
            <span>
              <span className="lil-quicklink__title">WhatsApp us</span>
              <span className="lil-quicklink__text">
                {contactInfo.phoneDisplay}
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
