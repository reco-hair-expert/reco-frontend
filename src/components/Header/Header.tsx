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

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <Link href="/" className={styles.logo}>
          <Image
              src="/images/logo/logo-1x.png"  // Путь к изображению
              alt="Логотип компании"
              width={64}  // Указываем ширину
              height={64}  // Указываем высоту
              sizes="(max-width: 768px) 48px, 48px" // Указываем размер в зависимости от ширины экрана
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
            <Link href={`tel:${phoneNumber}`} className={styles.call_btn}>
              <CallButton phoneNumber={phoneNumber} />
            </Link>
            <Link href="/cart" className={styles.cart_btn}>
              <CartButton cart={[]} />
            </Link>
          </div>

          <BurgerBtn /> 
        </div>
      </div>
    </header>
  );
};

export default Header;
