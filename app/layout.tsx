import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSON Resume Builder - Créateur de CV en ligne gratuit | Format JSON Resume Standard",
  description: "Créez facilement votre CV professionnel au format JSON Resume, le standard ouvert reconnu. Outil gratuit en ligne pour générer, éditer et exporter votre CV au format JSON Resume. Bientôt: conversion automatique de CV Word et PDF via IA.",
  keywords: ["json resume", "jsonresume", "cv json", "json resume builder", "json resume creator", "json resume generator", "cv format json", "créateur cv json", "json resume français", "json resume schema", "json resume standard", "cv professionnel json", "générateur cv json", "json resume online", "json resume editor"],
  authors: [{ name: "Guajava" }],
  creator: "Guajava",
  publisher: "Guajava",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "JSON Resume Builder - Créateur de CV gratuit",
    description: "Créez votre CV professionnel au format JSON Resume, le standard ouvert reconnu",
    type: "website",
    locale: "fr_FR",
    siteName: "JSON Resume Builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Resume Builder - Créateur de CV gratuit",
    description: "Créez votre CV professionnel au format JSON Resume",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {//TODO: transformer avec le domaine final lors du déploiement
    canonical: 'https://jsonresume.guajava.site',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <footer className="bg-gradient-to-r from-slate-900 to-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-300 mb-2">
              Développé avec ❤️ par{" "}
              <a 
                href="https://guajava.site" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                GUAJAVA
              </a>
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-400">
              <a 
                href="https://github.com/guajava-sasu/next-json-resume-form" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Code source
              </a>
              <span>•</span>
              <a 
                href="https://jsonresume.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                JSON Resume
              </a>     <span>•</span>    <a 
                href="https://github.com/guajava-sasu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Développeur
              </a>                              
              <span>•</span>
              <span className="text-gray-500">v0.1.0</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
