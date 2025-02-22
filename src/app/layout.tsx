import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import logo from "@/assets/osa_logo_biele.png";
import Image from "next/image";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<header className="sticky top-0 z-50 bg-gray-900 shadow-lg">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between items-center py-4">
							<a href="/" className="transition-opacity hover:opacity-90">
								<Image
									src={logo}
									alt="OSA Sport"
									width={170}
									height={41}
									priority
									className="h-10 w-auto"
								/>
							</a>

							<div className="flex items-center space-x-6">
								<a
									href="https://facebook.com/osasport"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white hover:text-gray-300 transition-colors duration-200"
								>
									<Facebook size={24} />
								</a>
								<a
									href="https://instagram.com/osasport"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white hover:text-gray-300 transition-colors duration-200"
								>
									<Instagram size={24} />
								</a>
							</div>
						</div>
					</div>
				</header>
				<div className="min-h-[calc(100vh-240px)] max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
					<QueryProvider>{children}</QueryProvider>
				</div>
				<footer className="bg-gray-900 text-white py-8 border-t-4 border-yellow-500">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
						<div>
							<h3 className="text-lg font-semibold">Contact Us</h3>
							<p className="flex items-center">
								<MapPin className="mr-2" size={20} />
								Address: 1234 Street Name, City, Country
							</p>
							<p className="flex items-center">
								<Phone className="mr-2" size={20} />
								Phone: +123 456 7890
							</p>
							<p className="flex items-center">
								<Mail className="mr-2" size={20} />
								Email: info@osasport.sk
							</p>
						</div>
						<div>
							<ul>
								<li>
									<a
										href="/gdpr"
										className="hover:text-gray-300 transition-colors duration-200"
									>
										Obchodné podmienky
									</a>
								</li>
								<li>
									<a
										href="/legal"
										className="hover:text-gray-300 transition-colors duration-200"
									>
										Ochrana osobných údajov
									</a>
								</li>
							</ul>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
