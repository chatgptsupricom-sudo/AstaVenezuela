import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/Loader";
import { Chatbot } from "@/components/Chatbot";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0b63cd",
};

export const metadata: Metadata = {
  title: {
    default: "ASTA | Consumibles para Impresoras",
    template: "%s | ASTA Venezuela",
  },
  description:
    "Descubre ASTA, la marca número #1 en consumibles para impresoras. Tóneres, tintas y cartuchos de calidad premium con máximo rendimiento.",
  keywords: [
    "ASTA",
    "Toner Venezuela",
    "Consumibles Impresoras",
    "Tintas Premium",
    "Asta Venezuela",
  ],
  authors: [{ name: "ASTA Team" }],
  // Modificamos esta sección agregando el "/"
  icons: {
    icon: "/ASTA LOGO.png",
    apple: "/ASTA LOGO.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-[#f3f5f4] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        {/* 2. Añadimos el Loader aquí para que cubra toda la página al cargar */}
        <PageLoader />
        <Chatbot />
        <div className="flex flex-col min-h-screen">{children}</div>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
