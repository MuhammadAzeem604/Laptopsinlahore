import React from "react";
import HomeBanner from "../components/home/HomeBanner";
import PopularCategories from "../components/home/popularCategories";
import PromotionalBanner from "../components/home/PromotionalBanner";
import NewArrivals from "../components/home/newArrivals";
import NeedAdvice from "../components/home/needAdvice";
import ShopLinks from "../components/home/shopLinks";
import FloatingContact from "../components/home/FloatingContact";

export default function Home() {
  return (
    <main className="main">
      <HomeBanner />
      <PopularCategories />
      <PromotionalBanner />
      <NewArrivals />
      <NeedAdvice />
      <ShopLinks />
      <FloatingContact />
    </main>
  );
}
