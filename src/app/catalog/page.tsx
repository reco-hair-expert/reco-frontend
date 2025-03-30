
import CatalogCardList from "@/components/CatalogCardList/CatalogCardList";
import { products } from "@/constants/products";
import styles from "./CatalogPage.module.scss";
import FilterToggle from "@/components/FilterToggle/FilterToggle";
import BackgroundCircles from "@/components/BackgroundCircles/BackgroundCircles";

export default function Catalog() {
  return (
    <>
      <section className="container">
        <h2 className={styles.title}>Всі товари</h2>

        <ul className={styles.productsList}>
          <CatalogCardList products={products.slice(0, 4)} perRow={4} />
        </ul>

        <button className={styles.productBtn}>Показати більше</button>
      </section>

      <section className={`container ${styles.recommendationContainer}`}>
        <div className={styles.recommendationHeader}>
          <h2 className={styles.title}>Рекомендації</h2>
          <FilterToggle />
        </div>
        <ul className={styles.recommendationList}>
          <CatalogCardList perRow={3} products={products.slice(0, 3)} />
        </ul>
        <BackgroundCircles className={styles.backgroundCircles} />
      </section>
    </>

  );
}
