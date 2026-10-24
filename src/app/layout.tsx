import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Superdeli · Padaria e delicatessen em Conceição do Jacuípe",
  description:
    "Pão quentinho, buffet por quilo do café da manhã ao fim da tarde, salgados e doces. Superdeli, em Conceição do Jacuípe, Bahia.",
  openGraph: {
    title: "Superdeli",
    description:
      "Padaria, delicatessen e restaurante por quilo em Conceição do Jacuípe, Bahia.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1f1712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-tom="escuro">
      <body>{children}</body>
    </html>
  );
}
