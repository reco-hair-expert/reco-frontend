import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";
import { Noto_Sans } from "next/font/google";
import "@/styles/reset.scss";
import { Metadata, Viewport } from "next";

const notoSans = Noto_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"]
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://reco.com.ua"),
  title: {
    default: "RECO",
    template: "%s | RECO"
  },
  description: 'RECO - Косметика майбутнього',
  icons: {
    icon: "/images/logo/logo-1x.png",
    shortcut: "/images/logo/logo-1x.png",
    apple: "/images/logo/logo-1x.png"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
