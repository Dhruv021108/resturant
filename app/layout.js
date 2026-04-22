import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AppProvider } from "@/components/app-provider";
import { AccessGate } from "@/components/access-gate";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
  title: "Amazing Chinese Restaurant | Reserve Your Table",
  description:
    "Premium Chinese restaurant website focused on table reservations, menu highlights, and the restaurant experience.",
  keywords: [
    "Amazing Chinese Restaurant",
    "Chinese food Dombivli",
    "seat reservation",
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
          <AccessGate />
          <div className="site-shell">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
