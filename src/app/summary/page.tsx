"use client";

import styles from "./SummaryPage.module.scss";
import SummarySection from "@/components/SummarySection/SummarySection";
import SummaryForm from "@/components/SummaryForm/SummaryForm";
import "@/styles/index.scss";

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
