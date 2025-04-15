import styles from "./InfoSection.module.scss";

export default function InfoSection({ title, content }: { title: string, content: string }) {
    return (
      <div className={styles.infoSection}>
        <h2>{title}</h2>
        <div
          className={styles.infoContent}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  }