"use client";

import { useState } from "react";
import Error from "../error";
import { TABS } from "@/lib/constants";

export default function SpreadsContent({
  initialDataByTab = {},
  initialErrorsByTab = {},
}) {
  const [activeTab, setActiveTab] = useState("currencies");

  const data = initialDataByTab[activeTab] ?? null;
  const errorMessage = initialErrorsByTab[activeTab] ?? null;
  const hasError = Boolean(errorMessage);
  const hasData = data?.headers?.length > 0 || data?.rows?.length > 0;

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded border px-4 py-2 text-sm ${
              activeTab === tab
                ? "border-zinc-700 bg-blue-500"
                : "border-zinc-300 bg-white hover:bg-zinc-100 "
            }`}
          >
            {tab.replace(/-/g, " ")}
          </button>
        ))}
      </div>

      {hasError && (
        <Error
          error={{ message: errorMessage }}
          reset={() => {}}
        />
      )}

      {!hasError && hasData && data && (
        <div className="rounded border border-zinc-200">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-100 ">
                {data.headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-4 py-2 text-left text-sm font-medium"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-zinc-100">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2 text-sm">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!hasError && !hasData && activeTab in initialDataByTab && (
        <p className="text-zinc-500">No table data for this tab.</p>
      )}
    </>
  );
}
