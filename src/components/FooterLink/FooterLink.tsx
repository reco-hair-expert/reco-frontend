import type { FooterButton } from "./types/FooterLink.types";
import React from "react";
import classNames from "classnames";
import styles from "./FooterLink.module.scss";
import Link from "next/link";

const footerButtons: FooterButton[] = [
  { title: "КАТАЛОГ", link: "catalog" },
  // { title: "ПРО НАС", link: "/about" },
  { title: "КОНСУЛЬТАЦІЯ", link: "/quiz" },
  { title: "КОНТАКТИ", link: "/contacts" }
];

const FooterLinks: React.FC = () => {
  return (
    <div className={classNames(styles.footerLinks)}>
      {footerButtons.map((button) => (
        <Link
          key={button.link}
          passHref
          aria-label={button.title}
          className={classNames(styles.footerLink)}
          href={button.link}
        >
          {button.title}
        </Link>
      ))}
    </div>
  );
};

export default FooterLinks;
