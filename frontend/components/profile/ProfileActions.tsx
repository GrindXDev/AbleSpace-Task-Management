"use client";

interface ProfileActionsProps {
  saved: boolean;
  onReset: () => void;
}

export default function ProfileActions({
  saved,
  onReset,
}: ProfileActionsProps) {
  return (
    <footer className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {saved && (
          <p className="text-sm font-medium text-emerald-600">
            Profile saved successfully.
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          Reset
        </button>

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Save changes
        </button>
      </div>
    </footer>
  );
}