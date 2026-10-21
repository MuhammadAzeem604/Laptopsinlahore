import { contactInfo } from "../constants/contact";

/**
 * Top bar of the header: the phone number on the left and the social links
 * (facebook / whatsapp) on the right - same as the live site.
 */
export default function TopContactBar() {
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href={contactInfo.phoneHref} title="Call us">
            <i className="icon-phone" />
            Call: {contactInfo.phoneDisplay}
          </a>
        </div>

        <div className="header-right">
          <ul className="top-social">
            <li>
              <a
                href={contactInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                aria-label="Facebook"
              >
                <i className="icon-facebook-f" />
              </a>
            </li>
            <li>
              <a
                href={contactInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <i className="icon-whatsapp" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
