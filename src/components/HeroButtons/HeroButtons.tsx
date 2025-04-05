import useDeviceDetection from "@/context/useDeviceDetection";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import styles from "./HeroButtons.module.scss";
import Link from "next/link";

const HeroButtons = () => {
  const { isMobile, isTablet } = useDeviceDetection();

  const getButtonSize = () => {
    if (isMobile) return "s";
    if (isTablet) return "m";
    return "l";
  };

  return (
    <div className={styles.buttonBar}>
      <Link href="/catalog">
        <Button
          size={getButtonSize()}
          variant="primary"
          className={styles.button}
        >
          <div className={styles.iconContainer}>
            <Icon
              name="icon-arrow-up-right2"
              size={30}
              fill="white"
              stroke="none"
              className={styles.ButtonIcon}
            />
          </div>
          <span className={styles.button__text}>ЗАМОВИТИ</span>
        </Button>
      </Link>
      <Link href="/about">
        <Button size={getButtonSize()} variant="secondary">
          <div className={styles.secondСontainer}>
            <Icon
              name="icon-arrow-up-right2"
              size={getButtonSize() === "s" ? 16 : 30}
              fill="white"
              stroke="none"
              className={styles.SecondIcon}
            />
          </div>
          <span className={styles.moreInfoText}>ПРО НАС</span>
        </Button>
      </Link>
    </div>
  );
};

export default HeroButtons;
