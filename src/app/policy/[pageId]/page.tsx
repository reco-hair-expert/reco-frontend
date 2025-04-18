import { infoPages } from "@/constants/policy";
import InfoSection from "@/components/InfoSection/InfoSection";
import styles from "./PolicyPage.module.scss";

interface InfoPageProps {
  params: { pageId: string };
}

export default function InfoPage({ params }: InfoPageProps) {
  const { pageId } = params;

  // Находим нужную страницу по pageId
  const pageData = infoPages.find((page) => page.id === pageId);

  if (!pageData) {
    return <p>Page not found!</p>;
  }

  return (
    <div className="container">
      <div className={styles.policyContainer}>
        <div className={styles.mainContent}>
          <InfoSection title={pageData.title} content={pageData.content} />
        </div>
        <aside className={styles.sidebar}>
          <h3>Другие страницы</h3>
          <ul>
            {infoPages.map((page) => (
              <li key={page.id}>
                <a href={`/policy/${page.id}`}>{page.title}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
