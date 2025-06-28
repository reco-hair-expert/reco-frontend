"use client";

import styles from "./SummaryPage.module.scss";
import SummarySection from "@/components/SummarySection/SummarySection";
import "@/styles/index.scss";

export default function SummaryPage() {
  return (
    <section className="container">
      <div className={styles.summaryPage}>
        <div className={styles.summaryContainer}>
          <SummarySection />
        </div>
      </div>
    </section>
  );
}
