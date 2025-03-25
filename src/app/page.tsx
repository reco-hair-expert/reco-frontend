import Head from "next/head";
import HeroSection from "@/components/HeroSection/HeroSection";
import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import Insta from "@/components/Insta/Insta";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { products } from "@/constants/products";

const MainPage = () => {
  return (
    <>
      <Head>
        <title>Головна | RECO</title>
        <meta name="description" content="Описание страницы" />
        <meta property="og:title" content="Головна | RECO" />
      </Head>
      <HeroSection />
      <FeaturesSection />
      <ProductCard products={products} />
      <Insta />
      <FeedbackSection />
    </>
  );
};

export default MainPage;
