import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body>
        <Preloader />
        <div id="toast"></div>
        <Navbar 
          session={
            session ? { name: session.user?.name ?? null, 
            role: session.user?.role ?? "USER" } : null
          } 
        />
          {children}
      </body>
    </html>
  );
}
