import bannerImage from "../../assets/images/slide-1.jpg";

/**
 * Promotional banner section with image on top and text below.
 * Full-width image with SEO text content underneath in user-friendly width.
 */
export default function PromotionalBanner() {
  return (
    <section className="lil-promo-banner">
      {/* <div className="lil-hero__media">
          <img src="/IMG_5243.JPG" alt="Laptops on sale in Lahore" />
        </div> */}

      <div className="container lil-promo__content">
        <p className="lil-promo__text">
        CC Laptop brings you the best value in new and used laptops, computer hardware and laptop accessories in Pakistan. Shop quality HP, Dell, Lenovo and Apple laptops, along with affordable RAM, SSDs, hard drives, chargers and replacement parts in Lahore Pakistan.
        </p>
      </div>
    </section>
  );
}
