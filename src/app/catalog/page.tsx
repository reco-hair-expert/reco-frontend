import { products } from "@/constants/products";
import styles from "./CatalogPage.module.scss";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://reco.com.ua"),
  title: "Каталог товарів ",
  description:
    "Перегляньте наш каталог товарів. Новинки, рекомендації та всі доступні товари.",
  openGraph: {
    title: "Каталог товарів ",
    description:
      "Перегляньте наш каталог товарів. Новинки, рекомендації та всі доступні товари.",
    type: "website",
    images: [
      {
        url: "/images/catalog-og.jpg",
        width: 1200,
        height: 630,
        alt: 'Каталог товарів '

      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Каталог товарів ",
    description: "Перегляньте наш каталог товарів. Новинки, рекомендації та всі доступні товари.",
    images: ['/images/catalog-og.jpg'],
  }
};

const ProductCard = dynamic(
  () =>
    import("@/components/ProductCard3/ProductCard").then((mod) => mod.default),
  {
    ssr: false
  }
);

const CatalogCardList = dynamic(
  () =>
    import("@/components/CatalogCardList/CatalogCardList").then(
      (mod) => mod.default
    ),
  {
    loading: () => <div>Loading...</div>
  }
);

const FilterToggle = dynamic(
  () =>
    import("@/components/FilterToggle/FilterToggle").then((mod) => mod.default),
  {
    loading: () => <div>Loading...</div>
  }
);

const BackgroundCircles = dynamic(
  () =>
    import("@/components/BackgroundCircles/BackgroundCircles").then(
      (mod) => mod.default
    ),
  {
    loading: () => null
  }
);

export default function Catalog() {
  // Структурированные данные для каталога
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.photo.src,
        "price": Object.values(product.sizes)[0] || 0,
        "priceCurrency": "UAH"
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main>
        <section className="container" aria-label="Новинки">
          <div className={styles.newProducts}>
            <h1 className={styles.title}>НОВИНКИ</h1>
            <ProductCard products={products} />
          </div>
        </section>

        <section className="container" aria-label="Все товары">
          <h2 className={styles.title}>Всі товари</h2>
          <nav aria-label="Навигация по товарам">
            <ul className={styles.productsList}>
              <CatalogCardList products={products} perRow={4} />
            </ul>
          </nav>
          <button
            className={styles.productBtn}
            aria-label="Показать больше товаров"
          >
            Показати більше
          </button>
        </section>

        <section
          className={`container ${styles.recommendationContainer}`}
          aria-label="Рекомендации"
        >
          <div className={styles.recommendationHeader}>
            <h2 className={styles.title}>Рекомендації</h2>
            <FilterToggle />
          </div>
          <nav aria-label="Рекомендуемые товары">
            <ul className={styles.recommendationList}>
              <CatalogCardList perRow={3} products={products.slice(0, 3)} />
            </ul>
          </nav>
          <BackgroundCircles className={styles.backgroundCircles} />
        </section>
      </main>
    </>
  );
}
