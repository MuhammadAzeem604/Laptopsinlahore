import { contactInfo } from "../constants/contact";
import '@fortawesome/fontawesome-free/css/all.min.css';
/**
 * Top bar of the header: the phone number on the left and the social links
 * (facebook / whatsapp) on the right - same as the live site.
 */
export default function TopContactBar() {
  return (
    <div className="header-top fixed-top-bar">
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
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
              >
                <i className="icon-instagram" />
              </a>
            </li>
            <li>
              <a
                href={contactInfo.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                aria-label="TikTok"
              >
                 <i className="fa-brands fa-tiktok"></i>

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
