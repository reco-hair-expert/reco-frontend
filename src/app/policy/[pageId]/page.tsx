"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { infoPages } from "@/constants/policy";
import InfoSection from "@/components/InfoSection/InfoSection";
import styles from "./PolicyPage.module.scss";

interface InfoPageProps {
  params: { pageId: string };
}

export default function InfoPage({ params }: InfoPageProps) {
  const { pageId } = params;
  const pathname = usePathname(); // для определения текущего пути

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
            {infoPages.map((page) => {
              const linkPath = `/policy/${page.id}`;
              const isActive = pathname === linkPath;

              return (
                <li key={page.id}>
                  <Link
                    href={linkPath}
                    className={isActive ? styles.activeLink : ""}
                  >
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
