import React from "react";
import HomeBanner from "../components/home/HomeBanner";
import PopularCategories from "../components/home/popularCategories";
import NewArrivals from "../components/home/newArrivals";
import NeedAdvice from "../components/home/needAdvice";
import ShopLinks from "../components/home/shopLinks";

export default function Home() {
  return (
    <main className="main">
      <HomeBanner />
      <PopularCategories />
      <NewArrivals />
      <NeedAdvice />
      <ShopLinks />
    </main>
  );
}
