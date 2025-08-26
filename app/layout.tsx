import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@/providers/ApolloProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthCheck } from "@/components/AuthCheck";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillSprint - E-Learning Platform",
  description: "Master new skills with our interactive online courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-S6HK86G87Q`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S6HK86G87Q');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ApolloProvider>
          <AuthProvider>
            <Navigation />
            <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
              <AuthCheck>
                {children}
              </AuthCheck>
            </main>
            <Toaster position="top-right" />
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
