import { contactInfo } from "../../constants/contact";

/**
 * "Why buy from us" block + the advice call to action.
 *
 * The copy is written for this shop (no text copied from another site).
 */
const features = [
  {
    icon: "icon-check-circle-o",
    title: "Checked, not just cleaned",
    text: "Every laptop is opened and tested - battery, keyboard, display, ports and specs - before it reaches the counter.",
  },
  {
    icon: "icon-map-marker",
    title: "One clear price",
    text: "The price you see here is the price you pay at the shop. No hidden charges added at the counter.",
  },
  {
    icon: "icon-truck",
    title: "Same day pickup",
    text: "Visit our Gulberg shop, or order online and collect your laptop from the counter the same day.",
  },
  {
    icon: "icon-whatsapp",
    title: "Advice before you buy",
    text: "Send us your budget and your work on WhatsApp - we will shortlist the machines that actually fit.",
  },
];

export default function NeedAdvice() {
  return (
    <>
      <section className="lil-section">
        <div className="container">
          <div className="lil-section__head">
            <span className="lil-eyebrow">Why shop with us</span>
            <h2 className="lil-section__title">A shop, not a drop shipper</h2>
            <p className="lil-section__sub">
              We keep our stock in Lahore, so you can see the machine before you
              pay for it.
            </p>
          </div>

          <div className="lil-features">
            {features.map((feature) => (
              <div className="lil-feature" key={feature.title}>
                <span className="lil-feature__icon">
                  <i className={feature.icon} />
                </span>
                <h3 className="lil-feature__title">{feature.title}</h3>
                <p className="lil-feature__text">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lil-cta">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2 className="lil-cta__title">Not sure which laptop fits?</h2>
              <p className="lil-cta__text">
                Tell us your budget and what you use it for. We reply on
                WhatsApp with a short list of the laptops we have in stock -
                no call centre, just the shop in Gulberg.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="lil-cta__actions">
                <a
                  className="lil-btn lil-btn--green"
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="icon-whatsapp" /> Chat on WhatsApp
                </a>
                <a className="lil-btn lil-btn--light" href={contactInfo.phoneHref}>
                  <i className="icon-phone" /> {contactInfo.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lil-section lil-section--tight">
        <div className="container">
          <p className="lil-section__sub">
            Looking for a laptop in Lahore? Lahore Laptops keeps new and used
            business laptops, student notebooks, gaming machines and MacBooks
            ready for sale, together with chargers, RAM, SSDs and other
            accessories. Browse by brand or by price, send us your budget and
            pick the machine up from our Gulberg shop - new and used laptops,
            parts and accessories in Lahore, Pakistan.
          </p>
        </div>
      </section>
    </>
  );
}
