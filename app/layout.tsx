import type { Metadata } from "next";
import { Be_Vietnam_Pro, Gabarito } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ExpressionProvider } from "./components/ExpressionContext";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joshua Yalung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${beVietnamPro.variable} ${gabarito.variable} font-serif h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ExpressionProvider>
          <Header />
          {children}
          <Footer />
        </ExpressionProvider>
      </body>
    </html>
  );
}
