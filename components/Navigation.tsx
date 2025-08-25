"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, User, BarChart3, Menu, X, Users, MessageSquare, LogOut } from "lucide-react";
import { useState } from "react";
import { ShimmerButton } from "./magicui/shimmer-button";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { useAuthStore } from "@/lib/authStore";
import { signOut } from "next-auth/react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuthStore();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: "/about", label: "About", icon: Users },
    { href: "/contact", label: "Contact", icon: MessageSquare },
  ];

  // Add admin link only for admin users
  if (isAdmin) {
    navItems.push({ href: "/admin", label: "Admin", icon: BarChart3 });
    navItems.push({ href: "/promotions", label: "Promotion", icon: BarChart3 });
  }

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    try {
      // end NextAuth session (if any) without full-page redirect
      await signOut({ redirect: false });
    } catch {}
    // clear local auth store regardless of next-auth state
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SkillSprint
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-600">
                    {user?.name || user?.email}
                  </span>
                </div>
                <InteractiveHoverButton onClick={handleLogout}>
                  <div className="flex items-center gap-2">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </div>
                </InteractiveHoverButton>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <InteractiveHoverButton>Login</InteractiveHoverButton>
                </Link>
                <Link href="/auth/register">
                  <ShimmerButton>Get Started</ShimmerButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-50"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-200">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-slate-600">
                      Welcome, {user?.name || user?.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/auth/login" className="block w-full text-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600">
                      Login
                    </Link>
                    <Link href="/auth/register" className="block w-full text-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
