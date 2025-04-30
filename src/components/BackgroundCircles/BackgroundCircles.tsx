import styles from "./BackgroundCircles.module.scss";
import type { BackgroundCirclesProps } from "./types/BackgroundCircles.types";

const BackgroundCircles = ({ className }: BackgroundCirclesProps) => {
  return <div className={`${styles.circles} ${className}`} />;
};

export default BackgroundCircles;
