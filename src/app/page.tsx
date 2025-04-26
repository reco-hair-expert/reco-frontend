import { Metadata } from "next";
import { MainPageClient } from "./MainPageClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://hairexpertreco.com"),
  title: "RECO - Косметика майбутнього",
  description:
    "RECO — інноваційний бренд косметики, що використовує натуральні інгредієнти та передові формули для створення ефективних засобів догляду за шкірою та волоссям.",
  openGraph: {
    title: "RECO - Косметика майбутнього",
    description:
      "RECO — інноваційний бренд косметики, що використовує натуральні інгредієнти та передові формули для створення ефективних засобів догляду за шкірою та волоссям.",
    type: "website",
    images: [
      {
        url: "/images/home-og.jpg",
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
      "RECO - Косметика майбутнього. Натуральні компоненти, ефективні формули, доступні ціни.",
    images: ["/images/home-og.jpg"]
  }
};

export default function MainPage() {
  return <MainPageClient />;
}
