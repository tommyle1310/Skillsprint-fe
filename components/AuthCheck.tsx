"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";
import { LoadingSpinner } from "./LoadingSpinner";
import { Button } from "./ui/button";
import Link from "next/link";

interface AuthCheckProps {
  children: React.ReactNode;
}

export function AuthCheck({ children }: AuthCheckProps) {
  const { isAuthenticated, loading, initialized, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      checkAuth();
    }
  }, [initialized, checkAuth]);

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // For now, allow all pages without authentication
  // You can modify this logic to protect specific routes
  return <>{children}</>;
}

// Component for protected routes that require authentication
export function ProtectedRoute({ children }: AuthCheckProps) {
  const { isAuthenticated, loading, initialized, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      checkAuth();
    }
  }, [initialized, checkAuth]);

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to SkillSprint</h1>
          <p className="text-muted-foreground">Please sign in to access your dashboard</p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
