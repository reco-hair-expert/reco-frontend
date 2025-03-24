import Header from "@/components/Header/Header"
import "@/styles/reset.scss"
import Footer from "@/components/Footer/Footer"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}