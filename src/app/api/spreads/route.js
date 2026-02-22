import { NextResponse } from "next/server";
import { parse } from "node-html-parser";

const TABS = [
  "currencies",
  "crypto",
  "eib",
  "future-indices",
  "commodities",
  "indices-spots",
];
const apiLink = "https://evest.blog/wp-json/wp/v2/posts";

function getTableFromHtml(html) {
  const doc = parse(html);
  const table = doc.querySelector("table");
  if (!table) return { headers: [], rows: [] };
  const allRows = table.querySelectorAll("tr");
  const headers = allRows[0]
    .querySelectorAll("th, td")
    .map((c) => c.text.trim());
  const rows = [];
  for (let i = 1; i < allRows.length; i++) {
    const cells = allRows[i].querySelectorAll("td").map((c) => c.text.trim());
    rows.push(cells);
  }
  return { headers, rows };
}

export async function GET(request) {
  const tab =
    request.nextUrl?.searchParams?.get("tab")?.toLowerCase() || "currencies";
  if (!TABS.includes(tab)) {
    return NextResponse.json({ error: "Invalid tab" }, { status: 400 });
  }

  try {
    const response = await fetch(`${apiLink}?slug=${encodeURIComponent(tab)}`);
    if (!response.ok) {
      return NextResponse.json(
        { error: "WordPress request failed" },
        { status: 502 },
      );
    }

    const posts = await response.json();

    const html = posts[0].content?.rendered ?? "";
    const { headers, rows } = getTableFromHtml(html);
    if (headers.length === 0 && rows.length === 0) {
      return NextResponse.json({ error: "No table in post" }, { status: 404 });
    }

    return NextResponse.json({ tab, data: { headers, rows } });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong", message: err.message },
      { status: 500 },
    );
  }
}
