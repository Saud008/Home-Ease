import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "HomeEase - Professional Home Services",
  description: "Premium home services at your fingertips. Book trusted professionals for all your home needs.",
  icons: {
    icon: '/logo.png',
  },
  keywords: "home services, cleaning, plumbing, electrical, maintenance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning={true}>
        <Toaster />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
