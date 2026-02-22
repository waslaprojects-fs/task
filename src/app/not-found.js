import Link from "next/link";
import Header from "./components/header";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Header />
      <div className="flex min-h-[60vh] flex-col justify-center text-center">
        <h1 className="mb-2 text-6xl font-bold text-zinc-900 dark:text-zinc-100">
          404
        </h1>
        <p>This page could not be found.</p>
        <Link href="/" className="rounded border">
          Go home
        </Link>
      </div>
    </div>
  );
}
