import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { DataProvider } from "@/context/dataContext";
import { Toaster } from "react-hot-toast";
import ClockTimer from "@/components/clockTimer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KronoSkill",
  description: "Master skills from best courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <DataProvider>
          <div className="relative md:w-full w-[96vw] flex justify-center items-center box-content m-0 p-0">
            <Navbar />
          </div>

          {children}
        </DataProvider>
        <ClockTimer />
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
