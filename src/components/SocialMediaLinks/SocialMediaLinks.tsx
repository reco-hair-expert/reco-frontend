import React from "react";
import { SocialMediaIconProps } from "./types/SocialMediaLinks.types";
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
      iconSrc = "images/icon/instagram.svg";
      link = "https://www.instagram.com";
      break;
    case "telegram":
      iconSrc = "images/icon/telegram.svg";
      link = "https://t.me";
      break;
    case "viber":
      iconSrc = "images/icon/viber.svg";
      link = "https://www.viber.com";
      break;
    default:
      iconSrc = "images/icon/instagram.svg";
      link = "https://www.instagram.com";
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Image
        src={iconSrc}
        alt={`${platform} icon`}
        width={size}
        height={size}
        className={styles.icon}
      />
    </a>
  );
};

export default SocialMediaIcon;
