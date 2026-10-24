import type { Metadata, Viewport } from "next";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/figtree";
import "./globals.css";

export const metadata: Metadata = {
  title: "SuperDeli · Delicatessen em Conceição do Jacuípe",
  description:
    "Deixamos seu dia mais gostoso. Pães e doces, buffet do café da manhã ao almoço e cestas para presentear, na Rua Dois de Julho, Centro de Conceição do Jacuípe.",
  openGraph: {
    title: "SuperDeli Delicatessen",
    description: "Deixamos seu dia mais gostoso. Pães, doces, buffet e cestas em Conceição do Jacuípe.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#232323",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
