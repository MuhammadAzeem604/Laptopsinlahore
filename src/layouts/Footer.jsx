import { Link } from "react-router-dom";
import { contactInfo } from "../constants/contact";
import { getPublicAsset } from "../utils/imageUrl";
import {
  Home,
  Laptops,
  Accessories,
  AboutUs,
} from "../router/routes";

/**
 * Footer of the public pages.
 *
 * Design: dark panel in the brand colours (dark #282828, blue #2978bd and
 * green #65b650 taken from the logo) with the shop locations, the quick
 * links and the contact details.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", to: Home },
    { label: "Laptops", to: Laptops },
    { label: "Accessories", to: Accessories },
    { label: "About Us", to: AboutUs },
  ];

  return (
    <footer className="lil-footer">
      <div className="lil-footer__main">
        <div className="container">
          <div className="row">
            {/* about + social */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <span className="lil-footer__logo">
                <img
                  src={getPublicAsset("logo.jpg")}
                  alt="Lahore Laptops"
                />
              </span>
              <p className="lil-footer__about">
                Lahore Laptops sells new and used laptops, parts and accessories
                from the top brands - HP, Dell, Lenovo, Apple, Asus, Acer and
                more. Every machine is checked in our Gulberg workshop before
                it is handed over.
              </p>
              <div className="lil-footer__social">
                <a
                  href={contactInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <i className="icon-facebook-f" />
                </a>
                <a
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <i className="icon-whatsapp" />
                </a>
                <a href={contactInfo.phoneHref} title="Call us" aria-label="Call us">
                  <i className="icon-phone" />
                </a>
              </div>
            </div>

            {/* quick links */}
            <div className="col-6 col-lg-2 mb-4 mb-lg-0">
              <h4 className="lil-footer__title">Quick Links</h4>
              <ul className="lil-footer__list">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* shop locations */}
            <div className="col-6 col-lg-3 mb-4 mb-lg-0">
              <h4 className="lil-footer__title">Our Shops</h4>
              {contactInfo.locations.map((location, index) => (
                <div className="lil-footer__shop" key={index}>
                  <p className="lil-footer__shop-title">{location.title}</p>
                  <p>
                    <i className="icon-map-marker" />
                    {location.address}
                  </p>
                  <a href={location.phoneHref}>
                    <i className="icon-phone" />
                    {location.phone}
                  </a>
                </div>
              ))}
            </div>

            {/* contact */}
            <div className="col-6 col-lg-3">
              <h4 className="lil-footer__title">Get in Touch</h4>
              <ul className="lil-footer__contact">
                <li>
                  <i className="icon-phone" />
                  <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a>
                </li>
                <li>
                  <i className="icon-whatsapp" />
                  <a
                    href={contactInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactInfo.phoneDisplay}
                  </a>
                </li>
                <li>
                  <i className="icon-facebook-f" />
                  <a
                    href={contactInfo.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Message us on Facebook
                  </a>
                </li>
                <li>
                  <i className="icon-map-marker" />
                  <span>Gulberg, Lahore, Pakistan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lil-footer__bottom">
        <div className="container">
          <p>
            &copy; {year} Lahore Laptops. All rights reserved. &nbsp;|&nbsp; New
            and used laptops, parts and accessories in Lahore, Pakistan.
          </p>
        </div>
      </div>
    </footer>
  );
}
