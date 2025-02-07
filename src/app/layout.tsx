import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { LivenessDataProvider } from "./_components/liveness-data-context";

export const metadata: Metadata = {
	title: "hibernated-bear-liveness",
	description: "L2BEAT hackathon 07.02.2025",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${GeistSans.variable}`}>
			<body className="bg-black text-white font-mono min-h-screen">
				<TRPCReactProvider>
					<LivenessDataProvider>{children}</LivenessDataProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
