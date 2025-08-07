import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono, Poppins } from 'next/font/google'
import type React from "react"
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100","200","300","400","500","600","700","800","900"]
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["100","200","300","400","500","600","700","800"],
	variable: "--font-jetbrains-mono"
})

export const metadata: Metadata = {
  title: "SearchX Operations Dashboard",
  description: "SearchX command and control system",
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-muted text-white ${jetbrainsMono.variable} ${poppins.className} antialiased">
        <Toaster richColors theme="dark" position="top-center" />
        {children}
        </body>
    </html>
  )
}