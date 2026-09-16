import { Chatbot } from "@/components/Chatbot";
import { PageLoader } from "@/components/Loader";
import { MotionProvider } from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Archivo (Omnibus-Type) se diseñó para impresión y pantalla a la vez. Usamos
// el eje de ancho expandido en los titulares: da la contundencia de rótulo
// industrial que le pega a un fabricante, y no es la grotesca de siempre.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

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
  // Literal a proposito: <meta name="theme-color"> lo lee el navegador antes
  // de aplicar CSS, asi que aqui no sirve var(--brand-strong).
  // Debe seguir a --brand-strong de app/globals.css.
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
    <html
      lang="es"
      className={`${archivo.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-surface text-slate-900 selection:bg-blue-100 selection:text-blue-900"
      >
        <MotionProvider>
          {/* 2. Añadimos el Loader aquí para que cubra toda la página al cargar */}
          <PageLoader />
          <Chatbot />
          <div className="flex flex-col min-h-screen">{children}</div>
        </MotionProvider>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
