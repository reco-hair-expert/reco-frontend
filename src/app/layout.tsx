import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";
import { Noto_Sans } from "next/font/google";
import "@/styles/reset.scss";

const notoSans = Noto_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],});

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