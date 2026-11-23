import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alojamiento. Un espacio solo para ti.",
  description: "Alojamiento privado para cantar, celebrar y conectar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="es" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
