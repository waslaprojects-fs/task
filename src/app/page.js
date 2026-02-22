import Link from "next/link";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header></Header>

      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Trading spreads data
          </h1>
          <p className="mt-4 text-lg">
            View live spreads for currencies, crypto, commodities and indices.
          </p>
          <div className="mt-10">
            <Link
              href="/spreads"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
            >
              Open spreads
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
