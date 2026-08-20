"use client";

import Sidebar from "@/components/layout/Sidebar";
import ProfilePicture from "@/components/profile/ProfilePicture";
import ProfileFields from "@/components/profile/ProfileFields";
import ProfileActions from "@/components/profile/ProfileActions";
import WorkspaceAccess from "@/components/profile/WorkspaceAccess";
import { useProfile } from "@/hooks/useProfile";

export default function ProfilePage() {
  const {
    profile,
    loaded,
    saved,
    updateField,
    handlePictureChange,
    removePicture,
    saveProfile,
    resetProfile,
  } = useProfile();

  if (!loaded) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="mx-auto h-80 max-w-3xl animate-pulse rounded-2xl bg-slate-200" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white px-6 py-5">
          <h1 className="text-xl font-semibold text-slate-900">
            Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your personal information.
          </p>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-8">
          <form
            onSubmit={saveProfile}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <ProfilePicture
              profile={profile}
              onPictureChange={handlePictureChange}
              onRemove={removePicture}
            />

            <ProfileFields
              profile={profile}
              onChange={updateField}
            />

            <ProfileActions
              saved={saved}
              onReset={resetProfile}
            />
          </form>

          <WorkspaceAccess />
        </div>
      </main>
    </div>
  );
}