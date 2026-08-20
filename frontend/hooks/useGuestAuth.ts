"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getGuestSession,
  guestSessionKey,
} from "@/lib/auth";

import type { GuestSession } from "@/lib/auth";

const authChangedEvent = "ablespace-auth-changed";

export function useGuestAuth() {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    function updateAuthentication() {
      setAuthenticated(Boolean(getGuestSession()));
    }

    updateAuthentication();

    window.addEventListener(
      authChangedEvent,
      updateAuthentication,
    );

    window.addEventListener(
      "storage",
      updateAuthentication,
    );

    return () => {
      window.removeEventListener(
        authChangedEvent,
        updateAuthentication,
      );

      window.removeEventListener(
        "storage",
        updateAuthentication,
      );
    };
  }, []);

  function continueAsGuest() {
    const session: GuestSession = {
      role: "guest",
      createdAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      guestSessionKey,
      JSON.stringify(session),
    );

    setAuthenticated(true);

    window.dispatchEvent(
      new Event(authChangedEvent),
    );

    router.replace("/");
  }

  function logout() {
    window.localStorage.removeItem(guestSessionKey);

    setAuthenticated(false);

    window.dispatchEvent(
      new Event(authChangedEvent),
    );

    router.replace("/login");
  }

  return {
    authenticated,
    continueAsGuest,
    logout,
  };
}