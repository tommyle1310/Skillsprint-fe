"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";
import { SessionProvider, useSession } from "next-auth/react";

function AuthSync() {
  const { data: session, status } = useSession();
  const { login, initialized, initialize, token } = useAuthStore();

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
        role: ((session.user as any).role as any) || 'USER',
      };
      // Preserve existing JWT token if present to prevent wiping it
      login(user, token || "nextauth");
    }
    // Do not auto-logout on unauthenticated transitions; preserve JWT store
  }, [status, session, login, token]);

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
