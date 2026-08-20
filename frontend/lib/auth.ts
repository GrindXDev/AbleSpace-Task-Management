export interface GuestSession {
  role: "guest";
  createdAt: string;
}

export const guestSessionKey =
  "ablespace-guest-session";

export function getGuestSession(): GuestSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedSession =
    window.localStorage.getItem(guestSessionKey);

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession) as GuestSession;
  } catch {
    window.localStorage.removeItem(guestSessionKey);
    return null;
  }
}