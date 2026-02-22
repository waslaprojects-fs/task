"use client";
export default function Error({ error, reset }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-xl">Something went wrong</h1>
        <p className="mb-6">
          {error?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="rounded border  bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-100"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
