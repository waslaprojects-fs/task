import { parse } from "node-html-parser";
import { TABS } from "./constants";

export { TABS };

const API_LINK = "https://evest.blog/wp-json/wp/v2/posts";

function getTableFromHtml(html) {
  const doc = parse(html);
  const table = doc.querySelector("table");
  if (!table) return { headers: [], rows: [] };
  const allRows = table.querySelectorAll("tr");
  const headers = allRows[0]
    ? allRows[0].querySelectorAll("th, td").map((c) => c.text.trim())
    : [];
  const rows = [];
  for (let i = 1; i < allRows.length; i++) {
    const cells = allRows[i].querySelectorAll("td").map((c) => c.text.trim());
    rows.push(cells);
  }
  return { headers, rows };
}

/**
 * Fetches spread table data for a single tab from the WordPress API.
 * Use in Server Components or API routes.
 * @param {string} tab - One of TABS (e.g. 'currencies', 'crypto')
 * @returns {Promise<{ headers: string[], rows: string[][] }>}
 * @throws {Error} When the request fails or no table is found
 */
export async function getSpreads(tab) {
  const slug = TABS.includes(tab) ? tab : "currencies";
  const response = await fetch(`${API_LINK}?slug=${encodeURIComponent(slug)}`, {
    // opt into dynamic rendering if you want fresh data per request
    // cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error("WordPress request failed");
  }
  const posts = await response.json();
  const html = posts[0]?.content?.rendered ?? "";
  const { headers, rows } = getTableFromHtml(html);
  if (headers.length === 0 && rows.length === 0) {
    throw new Error("No table in post");
  }
  return { headers, rows };
}
