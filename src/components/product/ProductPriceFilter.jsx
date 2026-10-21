import Accordion from "react-bootstrap/Accordion";
import { Slider } from "@material-ui/core";

export default function ProductPriceFilter({
  active,
  setActive,
  value,
  updateRange,
}) {
  return (
    <Accordion activeKey={active}>
      <Accordion.Item className="widget widget-collapsible" eventKey="1">
        <Accordion.Header onClick={() => setActive(active === "1" ? "" : "1")}>
          <h3 className="widget-title">Price</h3>
          <div className="arrow">
            <i
              className={active === "1" ? "icon-angle-up" : "icon-angle-down"}
            />
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div>
            Price Range: {value[0].toLocaleString()} -{" "}
            {value[1].toLocaleString()}
          </div>
          <div className="price-slider">
            <Slider
              min={20}
              max={500_000}
              value={value}
              onChange={updateRange}
              valueLabelDisplay="auto"
              color="#333"
            />
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
