import HeroSection from "@/components/HeroSection/HeroSection";
import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import Insta from "@/components/Insta/Insta";
import { products } from "@/constants/products";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://reco.com.ua"),
  title: "RECO - Косметика майбутнього",
  description:
    "RECO — інноваційний бренд косметики, що використовує натуральні інгредієнти та передові формули для створення ефективних засобів догляду за шкірою та волоссям.",
  openGraph: {
    title: "RECO - Косметика майбутнього",
    description:
      "RECO — інноваційний бренд косметики, що використовує натуральні інгредієнти та передові формули для створення ефективних засобів догляду за шкірою та волоссям.",
    type: "website",
    images: [
      {
        url: "/images/home-og.jpg",
        width: 1200,
        height: 630,
        alt: "RECO - Косметика майбутнього"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "RECO - Косметика майбутнього",
    description:
      "RECO - Косметика майбутнього. Натуральні компоненти, ефективні формули, доступні ціни.",
    images: ["/images/home-og.jpg"]
  }
};

const ProductCard = dynamic(
  () =>
    import("@/components/ProductCard3/ProductCard").then((mod) => mod.default),
  {
    ssr: false
  }
);

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
