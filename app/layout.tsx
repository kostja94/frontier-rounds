import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Instrument_Serif, Work_Sans } from "next/font/google";

import { GA_MEASUREMENT_ID, OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://frontierrounds.com"),
  title: {
    default: SITE_TITLE,
    template: "%s | Frontier Rounds",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Frontier Rounds",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Frontier Rounds — the money behind frontier AI, one round at a time.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${workSans.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
