"use client";

import type { ChangeEvent } from "react";
import type { ProfileData } from "@/lib/profile";

interface ProfilePictureProps {
  profile: ProfileData;
  onPictureChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onRemove: () => void;
}

export default function ProfilePicture({
  profile,
  onPictureChange,
  onRemove,
}: ProfilePictureProps) {
  const initials =
    profile.fullName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <section className="flex flex-col gap-5 border-b border-slate-200 p-6 sm:flex-row sm:items-center">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-xl font-semibold text-white">
        {profile.profilePicture ? (
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      <div className="flex-1">
        <h2 className="text-base font-semibold text-slate-900">
          Profile picture
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Upload a JPG, PNG, or WebP image smaller than
          2 MB.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <label className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
            Change picture

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={onPictureChange}
              className="hidden"
            />
          </label>

          {profile.profilePicture && (
            <button
              type="button"
              onClick={onRemove}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </section>
  );
}