import { contactInfo } from "../../constants/contact";

/**
 * Floating call / WhatsApp buttons shown only on small screens.
 *
 * Call on the bottom-left, WhatsApp on the bottom-right. The links are the
 * same ones already used by the header top bar and the footer.
 */
export default function FloatingContact() {
  return (
    <div className="lil-floating-contact">
      <a
        className="lil-floating-contact__btn lil-floating-contact__btn--call"
        href={contactInfo.phoneHref}
        title="Call us"
        aria-label="Call us"
      >
        <i className="icon-phone" />
        <span className="lil-floating-contact__label">Call</span>
      </a>

      <a
        className="lil-floating-contact__btn lil-floating-contact__btn--whatsapp"
        href={contactInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp us"
        aria-label="WhatsApp us"
      >
        <i className="icon-whatsapp" />
        <span className="lil-floating-contact__label">WhatsApp</span>
      </a>
    </div>
  );
}