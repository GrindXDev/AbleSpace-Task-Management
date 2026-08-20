"use client";

import type {
  EditableProfileField,
  ProfileData,
} from "@/lib/profile";

interface ProfileFieldsProps {
  profile: ProfileData;
  onChange: (
    field: EditableProfileField,
    value: string,
  ) => void;
}

export default function ProfileFields({
  profile,
  onChange,
}: ProfileFieldsProps) {
  return (
    <section className="space-y-5 p-6">
      <div>
        <label
          htmlFor="profile-email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="profile-email"
          type="email"
          value={profile.email}
          onChange={(event) =>
            onChange("email", event.target.value)
          }
          placeholder="Enter your email address"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        />
      </div>

      <div>
        <label
          htmlFor="profile-full-name"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Full name
        </label>

        <input
          id="profile-full-name"
          type="text"
          value={profile.fullName}
          onChange={(event) =>
            onChange("fullName", event.target.value)
          }
          placeholder="Enter your full name"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        />
      </div>

      <div>
        <label
          htmlFor="profile-title"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Title
        </label>

        <input
          id="profile-title"
          type="text"
          value={profile.title}
          onChange={(event) =>
            onChange("title", event.target.value)
          }
          placeholder="For example: Full Stack Developer"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        />
      </div>

      <div>
        <label
          htmlFor="profile-username"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Username
        </label>

        <input
          id="profile-username"
          type="text"
          value={profile.username}
          onChange={(event) =>
            onChange("username", event.target.value)
          }
          placeholder="Enter a username"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        />

        <p className="mt-1.5 text-xs text-slate-500">
          Use lowercase letters without spaces.
        </p>
      </div>
    </section>
  );
}