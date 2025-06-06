import styles from "./Footer.module.scss";
import type { FooterProps } from "./types/Footer.types";
import Image from "next/image";
import Link from "next/link";
import AddressForm from "../AddressForm/AddressForm";
import SocialMediaHub from "../SocialMediaHub/SocialMediaHub";
import { address, phoneNumber, email } from "@/constants/contacts";
import SocialMediaLinks from "../SocialMediaLinks/SocialMediaLinks";
import FooterLinks from "../FooterLink/FooterLink";

const PAYMENT_ICON = {
  src: "/images/sections/footer/visa-mastercard.svg",
  alt: "Visa and Mastercard payment options",
  width: 100,
  height: 40
};

const Footer = ({ className }: FooterProps) => {
  const combinedClass = className
    ? `${styles.header} ${className}`
    : styles.header;
  return (
    <footer className="container">
      <div className={`${combinedClass} ${styles.footer}`}>
        <div className={styles.footer_container}>
          <div className={styles.textContainer}>
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

          <div className={styles.payment_icon_container}>
            <Image
              alt={PAYMENT_ICON.alt}
              className={styles.payment_icon}
              height={PAYMENT_ICON.height}
              src={PAYMENT_ICON.src}
              width={PAYMENT_ICON.width}
            />
          </div>
        </div>
        <div className={styles.authorRights}>
          <p>© 2025 RECO. Всі права захищені.</p>
          <div className={styles.policyLinks}>
            <Link href="/policy/privacy-policy">Політика конфіденційності</Link>
            &nbsp;|&nbsp;
            <Link href="/policy/offer">Умови використання</Link>
            &nbsp;|&nbsp;
            <Link href="/policy/delivery-terms"> Умови доставки</Link>
            &nbsp;|&nbsp;
            <Link href="/policy/payment-terms"> Умови оплати</Link>
            &nbsp;|&nbsp;
            <Link href="/policy/refund-policy"> Умови повернення коштів </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
