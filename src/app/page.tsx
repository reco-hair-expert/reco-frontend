import HeroSection from "@/components/HeroSection/HeroSection";
import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import Insta from "@/components/Insta/Insta";
import { products } from "@/constants/products";

import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("@/components/ProductCard/ProductCard").then((mod) => mod.default), {
  ssr: false,
});

const MainPage = () => {
  return (
    <>
     
      <HeroSection />
      <FeaturesSection />
      <ProductCard products={products} />
      <Insta />
      <FeedbackSection />
    </>
  );
};

export default MainPage;
