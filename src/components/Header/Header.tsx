"use client";
import styles from "./Header.module.scss";
import "@/styles/index.scss";
import Image from "next/image";
import { navigationButtons } from "@/constants/navigationButtons";
import NavButtons from "@/components/NavButtons/NavButton";
import NavBar from "../NavBar/NavBar";
import Link from "next/link";
import CallButton from "../CallButton/CallButton";
import CartButton from "../CartButton/CartButton";
import { phoneNumber } from "@/constants/contacts";
import BurgerBtn from "../BurgerBtn/BurgerBtn";
import { useScrollHeader } from "@/hooks/useScrollHeader";

const Header = () => {
  const isHeaderVisible = useScrollHeader();

  return (
    <header
      className={`${styles.header} ${!isHeaderVisible ? styles.hidden : ""}`}
    >
      <div className="container">
        <div className={styles.content}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/logo/logo-1x.png"
              alt="Логотип компании"
              width={64}
              height={64}
              sizes="(max-width: 768px) 48px, 48px"
              className={styles.logoImg}
              unoptimized
            />
          </Link>

          <NavBar className={styles.navBar}>
            <NavButtons
              className={styles.navBarBtns}
              labels={navigationButtons.map((button) => button.title)}
              buttons={navigationButtons}
            />
          </NavBar>

          <div className={styles.active_btns}>
            <Link
              href={`tel:${phoneNumber}`}
              className={styles.call_btn}
              aria-label="Call"
            >
              <CallButton phoneNumber={phoneNumber} />
            </Link>
            <Link href="/cart" className={styles.cart_btn} aria-label="Cart">
              <CartButton cart={[]} />
            </Link>
          </div>

          <BurgerBtn aria-label="Menu" />
        </div>
      </div>
    </header>
  );
};

export default Header;
