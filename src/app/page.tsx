import type { Metadata } from "next";
import { MainPageClient } from "./MainPageClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://hairexpertreco.com"),
  title: "RECO - Косметика майбутнього",
  description:
    "RECO — інноваційний бренд косметики, що використовує натуральні інгредієнти та передові формули для створення ретельного догляду за волоссям.",
  openGraph: {
    title: "RECO - Косметика майбутнього",
    description:
      "RECO — інноваційний бренд косметики, що використовує натуральні інгредієнти та передові формули для створення ретельного догляду за волоссям.",
    type: "website",
    images: [
      {
        url: "/images/sections/hero/hero-desc-1x.png",
        width: 1200,
        height: 630,
        alt: "RECO - Косметика майбутнього"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "RECO - Косметика майбутнього",
    description:
      "RECO - Косметика майбутнього. Натуральні компоненти, ретельний догляд, доступні ціни.",
    images: ["/images/sections/hero/hero-desc-1x.png"]
  }
};

export default function MainPage() {
  return <MainPageClient />;
}
