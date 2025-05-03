import styles from "./ContactsPage.module.scss";

export default function ContactsPage() {
  return (
    <div className="container">
      <div className={styles.contactsContainer}>
        <h1 className={styles.title}>Контакти</h1>
        <ul className={styles.contactList}>
          <li>
            📞 Телефон:{" "}
            <a className={styles.link} href="tel:+380509883339">
              +38 (050) 988 33 39
            </a>
          </li>
          <li>
            📧 Email:{" "}
            <a className={styles.link} href="mailto:reco.hair.expert@gmail.com">
              reco.hair.expert@gmail.com
            </a>
          </li>
          <li>
            📷 Instagram:{" "}
            <a
              className={styles.link}
              href="https://www.instagram.com/hair__expert.reconstructor?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              rel="noopener noreferrer"
              target="_blank"
            >
              @hair__expert.reconstructor
            </a>
          </li>
          <li>
            💬 Telegram:{" "}
            <a
              className={styles.link}
              href="https://t.me/+380509883339"
              target="_blank"
              rel="noopener noreferrer"
            >
              @hair__expert.reconstructor
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
