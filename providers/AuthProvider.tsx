"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";
import { SessionProvider, useSession } from "next-auth/react";

function AuthSync() {
  const { data: session, status } = useSession();
  const { login, logout, initialized, initialize } = useAuthStore();

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const user = {
        id: (session.user as any).id || "",
        email: session.user.email || "",
        name: session.user.name || undefined,
        avatar: session.user.image || undefined,
        createdAt: new Date().toISOString(),
      };
      // Mark as logged in for app UI; token is managed by NextAuth
      login(user, "nextauth");
    } else if (status === "unauthenticated") {
      logout();
    }
  }, [status, session, login, logout]);

  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthSync />
      {children}
    </SessionProvider>
  );
}
