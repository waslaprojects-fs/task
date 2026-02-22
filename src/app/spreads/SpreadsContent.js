"use client";

import { useState, useEffect } from "react";
import Error from "../error";
import Loading from "../loading";

const TABS = [
  "currencies",
  "crypto",
  "eib",
  "future-indices",
  "commodities",
  "indices-spots",
];

export default function SpreadsContent() {
  const [activeTab, setActiveTab] = useState("currencies");
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchSpreads(tab) {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch(`/api/spreads?tab=${encodeURIComponent(tab)}`);
      const json = await res.json();
      if (!res.ok) {
        setErrorMessage(json.error || "Request failed");
        setStatus("error");
        setData(null);
        return;
      }
      if (!json.data?.headers?.length && !json.data?.rows?.length) {
        setErrorMessage("No table data");
        setStatus("error");
        setData(null);
        return;
      }
      setData(json.data);
      setStatus("success");
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong");
      setStatus("error");
      setData(null);
    }
  }

  useEffect(() => {
    fetchSpreads(activeTab);
  }, [activeTab]);

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

      {status === "loading" && <Loading />}

      {status === "error" && <Error error={{ message: errorMessage }} reset={() => fetchSpreads(activeTab)} />}

      {status === "success" && data && (
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
    </>
  );
}
