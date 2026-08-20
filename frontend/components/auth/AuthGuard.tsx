"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import { useGuestAuth } from "@/hooks/useGuestAuth";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { authenticated } = useGuestAuth();

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (authenticated === null) {
      return;
    }

    if (!authenticated && !isLoginPage) {
      router.replace("/login");
    }

    if (authenticated && isLoginPage) {
      router.replace("/");
    }
  }, [
    authenticated,
    isLoginPage,
    router,
  ]);

  if (isLoginPage) {
    return children;
  }

  if (authenticated !== true) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    );
  }

  return children;
}