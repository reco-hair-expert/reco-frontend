import styles from "./SummaryPage.module.scss";
import SummarySection from "@/components/SummarySection/SummarySection";
import SummaryForm from "@/components/SummaryForm/SummaryForm";
import "@/styles/index.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://reco.com.ua'),
  title: "Оформлення замовлення | RECO",
  description: "Оформіть ваше замовлення косметики RECO. Безпечна оплата, швидка доставка по всій Україні.",
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: "Оформлення замовлення | RECO",
    description: "Оформіть ваше замовлення косметики RECO. Безпечна оплата, швидка доставка по всій Україні.",
    type: "website",
    images: [
      {
        url: '/images/summary-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Оформлення замовлення RECO'
      }
    ]
  }
};

export default function SummaryPage() {
  return (
    <section className="container">
      <div className={styles.summaryPage}>
        <div className={styles.summaryContainer}>
          <SummaryForm />
          <SummarySection />
        </div>
      </div>
    </section>
  );
}
