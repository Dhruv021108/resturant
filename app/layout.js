import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AppProvider } from "@/components/app-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { FloatingActions } from "@/components/floating-actions";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata = {
  title: "Amazing Chinese Restaurant | Best Chinese Food Near You",
  description:
    "Premium Chinese restaurant website with online ordering, bookings, reviews, multilingual support, and admin dashboards.",
  keywords: [
    "Amazing Chinese Restaurant",
    "Chinese food Dombivli",
    "restaurant ordering",
    "table booking",
    "Chinese restaurant near me"
  ],
  openGraph: {
    title: "Amazing Chinese Restaurant",
    description: "Best Chinese Food Near You",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <AppProvider>
          <div className="site-shell">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <FloatingActions />
            <ChatbotWidget />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
