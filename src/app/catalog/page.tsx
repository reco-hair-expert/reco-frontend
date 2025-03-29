import CatalogCardList from "@/components/CatalogCardList/CatalogCardList";
import { products } from "@/constants/products";
import styles from "./CatalogPage.module.scss";

export default function Catalog() {
  return (
    <>
      <section className="container">
        <h2 className={styles.title}>Всі товари</h2>

        <ul className={styles.productsList}>
          <CatalogCardList products={products} perRow={4} />
        </ul>

        <button className={styles.productBtn}>Показати більше</button>
      </section>

      <section className={`container ${styles.recommendationContainer}`}>
        <h2 className={styles.title}>Рекомендації</h2>

        <ul className={styles.recommendationList}>
          <CatalogCardList perRow={3} products={products.slice(0, 3)} />
        </ul>
      </section>
    </>
  );
}
