import { useState, useEffect } from "react";
import React from "react";
export default function ProductDetailsTabs() {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            className={"nav-link " + (openTab === 1 ? "active" : "")}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            id="product-desc-link"
            data-toggle="tab"
            href="#link1"
            role="tab"
            aria-controls="product-desc-tab"
            aria-selected="true"
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a
            className={"nav-link " + (openTab === 2 ? "active" : "")}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
            id="product-info-link"
            data-toggle="tab"
            href="#link1"
            role="tab"
            aria-controls="product-info-tab"
            aria-selected="false"
          >
            Additional information
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div
          className={
            openTab === 1 ? "tab-pane fade show active" : "tab-pane fade"
          }
          id="link1"
          role="tabpanel"
          aria-labelledby="product-desc-link"
        >
          <div className="product-desc-content">
            <h3>Product Information</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
              turpis. Suspendisse urna viverra non, semper suscipit, posuere a,
              pede. Donec nec justo eget felis facilisis fermentum. Aliquam
              porttitor mauris sit amet orci. Aenean dignissim pellentesque
              felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
              consectetuer ligula vulputate sem tristique cursus.{" "}
            </p>
            <ul>
              <li>
                Nunc nec porttitor turpis. In eu risus enim. In vitae mollis
                elit.{" "}
              </li>
              <li>Vivamus finibus vel mauris ut vehicula.</li>
              <li>
                Nullam a magna porttitor, dictum risus nec, faucibus sapien.
              </li>
            </ul>

            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
              turpis. Suspendisse urna viverra non, semper suscipit, posuere a,
              pede. Donec nec justo eget felis facilisis fermentum. Aliquam
              porttitor mauris sit amet orci. Aenean dignissim pellentesque
              felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
              consectetuer ligula vulputate sem tristique cursus.{" "}
            </p>
          </div>
        </div>
        <div
          className={
            openTab === 2 ? "tab-pane fade show active" : "tab-pane fade"
          }
          id="link2"
          role="tabpanel"
          aria-labelledby="product-info-link"
        >
          <div className="product-desc-content">
            <h3>Information</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
              turpis. Suspendisse urna viverra non, semper suscipit, posuere a,
              pede. Donec nec justo eget felis facilisis fermentum. Aliquam
              porttitor mauris sit amet orci.{" "}
            </p>

            <h3>Fabric & care</h3>
            <ul>
              <li>Faux suede fabric</li>
              <li>Gold tone metal hoop handles.</li>
              <li>RI branding</li>
              <li>Snake print trim interior </li>
              <li>Adjustable cross body strap</li>
              <li>
                {" "}
                Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop: 61cm
              </li>
            </ul>

            <h3>Size</h3>
            <p>one size</p>
          </div>
        </div>
      </div>
    </div>
  );
}
