// import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import styles from "./ContactsPage.module.scss";
import { CONTACTS } from "@/constants/contacts";
import HighLightText from "@/components/HighLightText/HighLightText";

export default function ContactsPage() {
  return (
    <div className="container">
      <div className={styles.contactsContainer}>
        <div className={styles.contacts}>
          <HighLightText>
            <a
              href={CONTACTS.phoneHref}
              className={styles.contactCard}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className={styles.imgContainer}>
                <img
                  src="/icon/C_phone.svg"
                  alt="Phone Icon"
                  className={styles.icon}
                />
              </div>
              <span className={styles.link}>{CONTACTS.phoneNumber}</span>
            </a>
          </HighLightText>

          <a
            href={CONTACTS.emailHref}
            className={styles.contactCard}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={styles.imgContainer}>
              <img
                src="/icon/C_mail.svg"
                alt="Email Icon"
                className={styles.icon}
              />
            </div>
            <span className={styles.link}>{CONTACTS.email}</span>
          </a>

          <div className={styles.contactCard}>
            <div className={styles.imgContainer}>
              <img
                src="/icon/C_adr.svg"
                alt="Address Icon"
                className={styles.icon}
              />
            </div>
            {CONTACTS.address}
          </div>
          <div className={styles.contactCard}>
            <div className={styles.imgContainer}>
              <img
                src="/icon/C_time.svg"
                alt="Time Icon"
                className={styles.icon}
              />
            </div>
            {CONTACTS.time}
          </div>

          <a
            href={CONTACTS.instagramHref}
            className={styles.contactCard}
            style={{ textDecoration: "none", color: "inherit" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.imgContainer}>
              <img
                src="/icon/C_insta.svg"
                alt="Instagram Icon"
                className={styles.icon}
              />
            </div>
            <span className={styles.link}>{CONTACTS.instagramName}</span>
          </a>
          <a
            href={CONTACTS.telegramHref}
            className={styles.contactCard}
            style={{ textDecoration: "none", color: "inherit" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.imgContainer}>
              <img
                src="/icon/C_tele.svg"
                alt="Telegram Icon"
                className={styles.icon}
              />
            </div>
            <span className={styles.link}>{CONTACTS.telegramName}</span>
          </a>
        </div>
      </div>

      {/* <FeedbackSection /> */}
    </div>
  );
}
