import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@/providers/ApolloProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthCheck } from "@/components/AuthCheck";

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
