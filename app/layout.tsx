import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import { DashboardLayout } from "@/widgets/DashboardLayout";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@/app/styles/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Incidents Map & Dashboard",
  description: "Mapa y dashboard de incidencias de un proyecto de construcción.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <MantineProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
