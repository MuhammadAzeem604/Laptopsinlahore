import bannerImage from "../../assets/images/slide-1.jpg";

/**
 * Promotional banner section with image on top and text below.
 * Full-width image with SEO text content underneath in user-friendly width.
 */
export default function PromotionalBanner() {
  return (
    <section className="lil-promo-banner">
      <div className="lil-hero__media">
          <img src="/IMG_5243.JPG" alt="Laptops on sale in Lahore" />
        </div>

      <div className="container lil-promo__content">
        <p className="lil-promo__text">
          Looking for new and used laptops in Lahore, Pakistan? CC Laptop offers
          affordable laptops from top brands like HP, Dell, Lenovo, Apple MacBook,
          Acer, Huawei, ASUS, and Microsoft Surface. Explore the best new laptop
          prices in Lahore, used laptop prices, second-hand laptops, refurbished
          laptops, gaming laptops, business laptops, and budget-friendly laptops.
          Whether you need a laptop for students, office work, freelancing, or
          entertainment, CC Laptop has options for every budget. Discover quality
          laptops in Lahore at competitive prices and explore the latest deals on
          new and used laptops in Lahore with CC Laptop, your destination for
          affordable laptops in Pakistan.
        </p>
      </div>
    </section>
  );
}
