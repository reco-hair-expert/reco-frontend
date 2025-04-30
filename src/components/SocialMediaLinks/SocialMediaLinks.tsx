import React from "react";
import type { SocialMediaIconProps } from "./types/SocialMediaLinks.types";
import styles from "./SocialMediaLinks.module.scss";
import Image from "next/image";

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({
  platform,
  size = 64
}) => {
  let iconSrc;
  let link = "";

  switch (platform) {
    case "instagram":
      iconSrc = "/icon/instagram.svg";
      link = "https://www.instagram.com";
      break;
    case "telegram":
      iconSrc = "/icon/telegram.svg";
      link = "https://t.me";
      break;
    case "viber":
      iconSrc = "/icon/viber.svg";
      link = "https://www.viber.com";
      break;
    default:
      iconSrc = "/icon/instagram.svg";
      link = "https://www.instagram.com";
  }

  return (
    <a href={link} rel="noopener noreferrer" target="_blank">
      <Image
        alt={`${platform} icon`}
        className={styles.icon}
        height={size}
        src={iconSrc}
        width={size}
      />
    </a>
  );
};

export default SocialMediaIcon;
