import styles from "./Footer.module.scss";
import type { FooterProps } from "./types/Footer.types";
import Image from "next/image";
import Link from "next/link";
import AddressForm from "../AddressForm/AddressForm";
import SocialMediaHub from "../SocialMediaHub/SocialMediaHub";
import { address, phoneNumber, email } from "@/constants/contacts";
import SocialMediaLinks from "../SocialMediaLinks/SocialMediaLinks";
import FooterLinks from "../FooterLink/FooterLink";

const Footer = ({ className }: FooterProps) => {
  const combinedClass = className
    ? `${styles.header} ${className}`
    : styles.header;
  return (
    <footer className="container">
      <div className={`${combinedClass} ${styles.footer}`}>
        <div className={styles.footer_container}>
          <div className={styles.logo}>
            <Link className={styles.linkLogo} href="/">
              <Image
                alt="Логотип компанії"
                height={64}
                sizes="(max-width: 768px) 48px, 48px"
                src="/images/logo/logo.svg"
                width={64}
              />
            </Link>
          </div>

          <div className={styles.addressForm}>
            <AddressForm
              address={address}
              email={email}
              phoneNumber={phoneNumber}
            />
          </div>

          <div className={styles.footerLinks}>
            <FooterLinks />
          </div>

          <div className={styles.socialHub}>
            <SocialMediaHub>
              <SocialMediaLinks platform={"instagram"} />
              <SocialMediaLinks platform={"viber"} />
              <SocialMediaLinks platform={"telegram"} />
            </SocialMediaHub>
          </div>
        </div>

        <div className={styles.authorRights}>
          <p>© 2025 RECO. Всі права захищені.</p>
          <div className={styles.policyLinks}>
            <Link href="/policy/privacy-policy">Політика конфіденційності</Link>
            &nbsp;|&nbsp;
            <Link href="/policy/offer">Умови використання</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
