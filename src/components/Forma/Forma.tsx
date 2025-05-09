import React from "react";
import styles from "./Form.module.scss";
import Icon from "../Icon/Icon";
import useDeviceDetection from "@/context/useDeviceDetection";
import Button from "../Button/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PhoneConsultationForm: React.FC = () => {
  const { isMobile, isTablet } = useDeviceDetection();
  const pathname = usePathname();
  const isQuizPage = pathname === "/quiz";

  const getButtonSize = () => {
    if (isMobile) return "m";
    if (isTablet) return "m";
    return "l";
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContent}>
        <h3 className={styles.mainHeading}>
          Індивідуальний підбір — за 2 хвилини!
        </h3>
        <h3 className={styles.upperSubheading}>
          Пройди короткий квіз і дізнайся, що справді працює для тебе
        </h3>
        <span className={styles.plusSign}> +</span>
        <h3 className={styles.lowerSubheading}>
          в подарунок безкоштовна консультація
        </h3>

        <div className={styles.buttonArea}>
          <Link passHref href="/quiz" legacyBehavior>
            <Button
              className={styles.actionButton}
              size={getButtonSize()}
              variant="primary"
              disabled={isQuizPage}
            >
              <div className={styles.iconWrapper}>
                <Icon
                  className={styles.buttonIcon}
                  fill="white"
                  name="icon-arrow-up-right2"
                  size={isMobile ? 25 : 30}
                  stroke="none"
                />
              </div>
              <span className={styles.buttonLabel}>{"ПОЧАТИ КВІЗ"}</span>
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PhoneConsultationForm;
