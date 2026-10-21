import Accordion from "react-bootstrap/Accordion";
import { categoryType } from "../../constants";

export default function ProductCategories({
  categories,
  productType,
  selectedCategory,
  onSelect,
  active,
  setActive,
}) {
  return (
    <Accordion activeKey={active}>
      <Accordion.Item className="widget widget-collapsible" eventKey="0">
        <Accordion.Header onClick={() => setActive(active === "0" ? "" : "0")}>
          <h3 className="widget-title">
            {productType === categoryType.Laptop ? "Brands" : "Categories"}
          </h3>
          <div className="arrow">
            <i
              className={active === "0" ? "icon-angle-up" : "icon-angle-down"}
            />
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="collapse show" i>
            <div className="widget-body">
              <div className="filter-items filter-items-count">
                {categories.map(
                  (item, index) =>
                    item.type === productType && (
                      <div className="filter-item" key={index}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`side-filter-category-${item.id}`}
                            checked={item.id == selectedCategory}
                            onClick={() => onSelect(item.id)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={`side-filter-category-${item.id}`}
                          >
                            {item.name}
                          </label>
                        </div>
                        {/* <span className="item-count">3</span> */}
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
