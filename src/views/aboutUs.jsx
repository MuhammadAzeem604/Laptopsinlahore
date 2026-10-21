import React from "react";
import { Home } from "../router/routes";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <main>
      <div className="page-content mt-14 mt-lg-8 mt-md-8">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-3 mb-lg-8">
              <h2 className="text-center mb-2 about-main-title">
                NEW AND USED LAPTOPS IN LAHORE
              </h2>
              <h2 className="title text-center mb-2">(Lahore Laptops)</h2>
              <p className="justify-text-p">
                Welcome to the world of <b>Laptops</b> Let us admit we all are
                very busy in our own routines and do not have time to wander
                around shopping for the right <b>Laptop</b> that suits our
                needs. <b>Lahore Laptops</b> does half of our homework by
                listing down all the facts and figures, like the features and
                specifications of <b>Laptops</b> alongside a brief review so
                that we know what we can expect out of it. How speedily it will
                perform, how it looks from the outside, and what it carries in
                the inside. <b>Lahore laptops</b> answers all these questions
                regarding the products and delivers it right to your doorstep.
                Using our website.{" "}
                <Link to={Home}>https://laptopsinlahore.com/home</Link>. So what
                else are you looking for?
              </p>
            </div>

            <div className="col-lg-12 mb-3 mb-lg-8">
              <h2 className="title mb-2">ABOUT US:</h2>
              <p className="justify-text-p">
                <b>Lahore Laptops</b> is a professional and one of the
                well-known brand started its journey in <b>Lahore</b> Pakistan
                at Hafeez Centre. Since its beginning, <b>Lahore laptops</b> has
                specialized in Sales and Service of <b>Laptops</b>.{" "}
                <b>Lahore Laptops</b> is associated with all renowned brands
                such as HP, Dell, Acer, Lenovo, Asus, Macbook , Intel etc. The
                company has trained staff its Sales, Stock, Accounts,
                Administration and Customer Support Departments.{" "}
                <b>Lahore Laptops</b> would be your perfect choice for your{" "}
                <b>laptops</b>. With <b>Lahore Laptops</b> you are just one step
                for your perfect gadgets solution.
              </p>
            </div>

            <div className="col-lg-12 mb-2 mb-lg-4">
              <h2 className="title mb-2">FACILITIES WE PROVIDE:</h2>
              <p className="justify-text-p">
                <b>Lahore Laptops</b> knows very well about how to facilitate
                their clients by providing immense solutions for a perfect{" "}
                <b>laptops</b>.
              </p>
            </div>

            <div className="col-lg-12 ml-3 mb-2 mb-lg-4">
              <h2 className="title mb-2">1) THE STAMP OF ORIGINALITY</h2>
              <p className="justify-text-p">
                When you are ordering online there is a lot of deception going
                on. Unlike clothes, when you are ordering a gadget, it is not
                the color, print or material that matters, it is actually the
                processor, RAM, the specifications and the Seal of Originality
                that matters the most. What some e-stores show and claim is
                something else, while what they deliver is entirely different.{" "}
                <b>Lahore laptops</b> does not believe in making false claims,
                we only claim what the product offers and do our level best to
                make sure it reaches you safely with the closure of originality
                intact. To further assist, all of our products are under
                warranty with an option to add <b>Lahore laptops</b> local
                warranty plan.
              </p>
            </div>

            <div className="col-lg-12 ml-3 mb-2 mb-lg-4">
              <h2 className="title mb-2">2) QUICKEST DELIVERY</h2>
              <p className="justify-text-p">
                Ordered a product online but it didn’t make it on time. Haven’t
                we all been through this? <b>Lahore Laptops</b> makes sure the
                product reaches you within 2-3 working days. To keep the product
                safe, it is cushioned with safety packaging to prevent any sort
                of damage and delivered through a reliable source to make sure
                it is not mishandled in any way.
              </p>
            </div>

            <div className="col-lg-12 ml-3 mb-2 mb-lg-4">
              <h2 className="title mb-2">3) CLIENT FACILITY</h2>
              <p className="justify-text-p">
                What is a Brand without a good Customer Service? Just a petty
                name and <b>Lahore Laptops</b> is not one of those petty names.
                Their customer support service is available to receive your
                feedbacks and answer your queries. Customers can easily reach
                them via call, emails, and online support or simply leave us a
                message on Facebook or Instagram.
              </p>
            </div>

            <div className="col-lg-12 ml-3 mb-2 mb-lg-4">
              <h2 className="title mb-2">4) LOWEST PRICES (ONLINE) IN PAKISTAN</h2>
              <p className="justify-text-p">
                <b>Lahore laptops</b> brings you brand new/ used products with
                the seal of originality at an unbelievably low price than other
                online suppliers. To maintain affordability and reach out the
                masses is what they basically intend to strive for{" "}
                <b>laptops</b> at{" "}
                <Link to={Home}>https://laptopsinlahore.com/home</Link> you will
                find it at the lowest prices online in Pakistan.
              </p>
            </div>

            <div className="col-lg-12 mb-2 mb-lg-4">
              <h2 className="title mb-2">OBJECTIVE:</h2>
              <p className="justify-text-p">
                Our hard working staff always welcoming their clients in a
                friendly way that they can easily customize their requirements
                without any hesitation, the staff always stand by to cooperate
                with their client’s whole hearted and discuss their proper need
                of what they want to be their sign looks like. Our manufactures
                proud to provide their inventive services.
              </p>
            </div>
          </div>

          <div className="mb-5" />
        </div>
      </div>
    </main>
  );
}
