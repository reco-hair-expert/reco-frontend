import { Metadata } from "next";
import { CatalogClient } from "./CatalogClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://reco.com.ua"),
  title: "Каталог товарів",
  description:
    "Перегляньте наш каталог товарів. Новинки, рекомендації та всі доступні товари.",
  openGraph: {
    title: "Каталог товарів",
    description:
      "Перегляньте наш каталог товарів. Новинки, рекомендації та всі доступні товари.",
    type: "website",
    images: [
      {
        url: "/images/catalog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Каталог товарів"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Каталог товарів",
    description:
      "Перегляньте наш каталог товарів. Новинки, рекомендації та всі доступні товари.",
    images: ["/images/catalog-og.jpg"]
  }
};

export default function Catalog() {
  return <CatalogClient />;
}
