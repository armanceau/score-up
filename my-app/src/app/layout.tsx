import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getJeux } from "@/lib/jeux";
import { JeuxProvider } from "@/lib/jeuxContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Score Up",
  description:
    "Compte les points, sauvegarde tes scores de jeux de société et partage-les avec tes amis !",
  alternates: {
    canonical: "https://scoreup.vercel.app",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jeux = await getJeux(); // fetch côté serveur
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Qs_f9zlJdHjYeovruOyz-yOB__9bym4VtiQPccyRmCU"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <JeuxProvider jeuxInitiaux={jeux}>
          <Navbar />

          {children}
        </JeuxProvider>
      </body>
    </html>
  );
}
