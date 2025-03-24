import styles from "./Footer.module.scss";
import { FooterProps } from "./types/Footer.types";
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
          <Link href="/" className={styles.linkLogo}>
            <Image
              src="/images/logo/logo-1x.png" // Путь к изображению
              alt="Логотип компании"
              width={64} // Указываем ширину
              height={64} // Указываем высоту
              sizes="(max-width: 768px) 48px, 48px" // Указываем размер в зависимости от ширины экрана
            />
          </Link>
          <FooterLinks />
          <AddressForm
            address={address}
            phoneNumber={phoneNumber}
            email={email}
          />
          <SocialMediaHub>
            <SocialMediaLinks platform={"instagram"} />
            <SocialMediaLinks platform={"viber"} />
            <SocialMediaLinks platform={"telegram"} />
          </SocialMediaHub>
        </div>
        <p className={styles.authorRights}>
          © 2025 RECO. Всі права захищені. Політика конфіденційності | Умови
          використання
        </p>
      </div>
    </footer>
  );
};

export default Footer;
