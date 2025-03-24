import styles from "./Header.module.scss";
import "@/styles/index.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>

          <div className={styles.active_btns}>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
