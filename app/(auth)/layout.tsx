import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "GdanaStore - Store Auth",
  description: "Next.js 14 Gdana4180 Ecommerce store",
=======
  title: "TuniCraft - Store Auth",
  description: "Next.js 14 TuniCraft Ecommerce store",
>>>>>>> 076a9bf088066a6e7ddf9009b95febe10bf344af
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
