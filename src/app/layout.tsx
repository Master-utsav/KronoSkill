import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import { Providers } from "./Providers";
import { Toaster } from "react-hot-toast";
import ClockTimer from "@/components/clockTimer";
import Providers from "./Providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Academy",
  description: "Learn music from best courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="relative w-full flex justify-normal items-center box-content m-0 p-0">
          <Navbar />
        </div>
        <Providers>
          {children}
        </Providers>
        <ClockTimer/>
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
