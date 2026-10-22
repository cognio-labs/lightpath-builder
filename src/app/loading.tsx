export default function Loading() {
  return (
    <div className="min-h-[65vh] bg-[#fffdf9] px-4 py-12 sm:px-6" role="status" aria-live="polite">
      <div className="mx-auto w-full max-w-6xl animate-pulse">
        <div className="mb-5 h-3 w-28 rounded-full bg-amber-200/70" />
        <div className="h-10 w-full max-w-2xl rounded-xl bg-[#521623]/10 sm:h-14" />
        <div className="mt-4 h-4 w-full max-w-xl rounded bg-slate-200" />
        <div className="mt-2 h-4 w-4/5 max-w-lg rounded bg-slate-200" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-amber-100 bg-white">
              <div className="aspect-[16/10] bg-amber-100/70" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-5/6 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading page</span>
    </div>
  );
}
