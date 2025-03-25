import BackgroundCircles from "@/components/BackgroundCircles/BackgroundCircles";
import styles from "./CartPage.module.scss";
import CartItems from "@/components/CartItems/CartItems";
import CartSummary from "@/components/CartSummary/CartSummary";
import Head from "next/head";
import HighlightText from "@/components/HighLightText/HighLightText";
import "@/styles/index.scss";

export default function CartPage() {
  return (
    <section className="container">
      <Head>
        <title>Кошик | RECO</title>
        <meta name="description" content="Описание страницы" />
        <meta property="og:title" content="Кошик | RECO" />
      </Head>
      <div className={styles.cartPage}>
        <BackgroundCircles className={styles.backgroundCirclesTop} />
        <h1>
          <HighlightText>КОШИК</HighlightText>
        </h1>
        <div className={styles.cartContainer}>
          <CartItems />
          <CartSummary />
        </div>
        <BackgroundCircles className={styles.backgroundCirclesCenter} />
      </div>
    </section>
  );
}
