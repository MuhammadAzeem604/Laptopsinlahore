import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBrands } from "../../services";
import { Laptops } from "../../router/routes";
import { getBrandImage } from "../../utils/imageUrl";

/**
 * "Shop by brand" block of the home page.
 *
 * The list comes from the API (GET /Categories?type=laptop), so a new brand
 * added in the admin panel shows up here automatically.
 */
export default function PopularCategories() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let isMounted = true;

    getBrands().then((data) => {
      if (isMounted) {
        setList(Array.isArray(data) ? data : []);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!list.length) return null;

  return (
    <section className="lil-section">
      <div className="container">
        <div className="lil-section__head">
          <span className="lil-eyebrow">Shop by brand</span>
          <h2 className="lil-section__title">Every brand on one shelf</h2>
          <p className="lil-section__sub">
            Pick a brand to see what we have in stock right now - from everyday
            second hand machines to brand new laptops.
          </p>
        </div>

        <div className="lil-brand-grid">
          {list.map((item) => (
            <Link
              key={item.id}
              to={{
                pathname: Laptops,
                state: { category: item },
              }}
              className="lil-brand"
            >
              <span className="lil-brand__logo">
                <img
                  src={getBrandImage(item.name, item.imageUrl)}
                  alt={`${item.name} laptops`}
                />
              </span>
              <span className="lil-brand__name">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
