import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// 1. Nueva forma de exportar el Viewport para eliminar el Warning de la consola
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0b63cd", // Color corporativo de ASTA para la barra del navegador
};

// 2. Metadata limpia sin el campo 'viewport'
export const metadata: Metadata = {
  title: {
    default: "ASTA | Consumibles Premium para Impresoras",
    template: "%s | ASTA Venezuela",
  },
  description:
    "Descubre ASTA, la marca número 1 en consumibles para impresoras. Tóneres, tintas y cartuchos de calidad premium con máximo rendimiento.",
  generator: "v0.app",
  keywords: [
    "ASTA",
    "Toner Venezuela",
    "Consumibles Impresoras",
    "Tintas Premium",
    "Asta Venezuela",
  ],
  authors: [{ name: "ASTA Team" }],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
        {/* Envoltorio principal para asegurar que el contenido ocupe el alto de pantalla */}
        <div className="flex flex-col min-h-screen">{children}</div>

        {/* Solo carga Analytics en producción */}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
