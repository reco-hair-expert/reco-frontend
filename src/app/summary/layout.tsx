import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://hairexpertreco.com"),
  title: "Оформлення замовлення ",
  description:
    "Оформіть ваше замовлення косметики RECO. Безпечна оплата, швидка доставка по всій Україні.",
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: "Оформлення замовлення ",
    description:
      "Оформіть ваше замовлення косметики RECO. Безпечна оплата, швидка доставка по всій Україні.",
    type: "website",
    images: [
      {
        url: "/images/summary-og.jpg",
        width: 1200,
        height: 630,
        alt: "Оформлення замовлення RECO"
      }
    ]
  }
};

export default function SummaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 