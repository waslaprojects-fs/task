import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-lg font-semibold ">Spreads</span>
          <nav>
            <Link
              href="/spreads"
              className="rounded-md px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-200"
            >
              View spreads
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
