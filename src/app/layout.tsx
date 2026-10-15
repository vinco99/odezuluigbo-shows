import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/inter";
import "@fontsource/poppins";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";


export const metadata: Metadata = {
  title: "Odezuluigbo Shows",
  description: "Get the latest Igbo entertainment news, events, and shows. Odezuluigbo Shows is your go-to source for all things Igbo entertainment.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <Preloader />
        <div id="toast"></div>
        <Navbar 
          session={
            session ? { name: session.user?.name ?? null, 
            role: session.user?.role ?? "USER", creditBalance: session.user?.creditBalance ?? 0 } : null
          } 
        />
          {children}
      </body>
    </html>
  );
}
