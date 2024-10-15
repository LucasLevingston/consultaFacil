import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/authprovider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ConsultaFácil",
  description:
    "Um sistema de gerenciamento de pacientes em saúde projetado para simplificar o registro de pacientes, agendamento de consultas e gerenciamento de prontuários médicos para prestadores de serviços de saúde.",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <ThemeProvider attribute="class" defaultTheme="system">
          <body
            className={cn("min-h-screen font-work-sans antialiased  ", fontSans.variable)}
          >
            <Header />
            <div className="flex flex-col font-work-sans">{children}</div>
            <Footer />
            <Toaster />
          </body>
        </ThemeProvider>
      </html>
    </AuthProvider>
  );
}
