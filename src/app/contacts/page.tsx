import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import styles from "./ContactsPage.module.scss";
import { CONTACTS } from "@/constants/contacts";

export default function ContactsPage() {
  return (
    <div className="container">
      <div className={styles.contactsContainer}>
        <div className={styles.contacts}>
          <div className={styles.contactCard}>
            📞{" "}
            <a href={CONTACTS.phoneHref} className={styles.link}>
              {CONTACTS.phoneNumber}
            </a>
          </div>

          <div className={styles.contactCard}>
            📧{" "}
            <a href={CONTACTS.emailHref} className={styles.link}>
              {CONTACTS.email}
            </a>
          </div>

          <div className={styles.contactCard}>📍 {CONTACTS.address}</div>

          <div className={styles.contactCard}>
            📷{" "}
            <a
              href={CONTACTS.instagramHref}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTACTS.instagramName}
            </a>
            <br />
            💬{" "}
            <a
              href={CONTACTS.telegramHref}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTACTS.telegramName}
            </a>
          </div>
        </div>
      </div>

      <FeedbackSection />
    </div>
  );
}
