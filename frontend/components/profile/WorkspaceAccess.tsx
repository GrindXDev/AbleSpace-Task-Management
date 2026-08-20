export default function WorkspaceAccess() {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">
        Workspace access
      </h2>

      <div className="mt-5 flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-900">
            AbleSpace workspace
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Remove yourself from this workspace.
          </p>
        </div>

        <button
          type="button"
          disabled
          title="Workspace removal is not implemented"
          className="shrink-0 cursor-not-allowed rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-400 opacity-70"
        >
          Leave workspace
        </button>
      </div>
    </section>
  );
}