import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono, Poppins } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";


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
	title: "SearchX"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br" suppressHydrationWarning>
			<head />
			<body className={`${poppins.className} ${jetbrainsMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster richColors theme="dark" position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}
