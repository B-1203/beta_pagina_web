import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cabina. Un espacio solo para ti.",
  description: "Cabinas privadas para cantar, celebrar y conectar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="es"><body>{children}</body></html>;
}
