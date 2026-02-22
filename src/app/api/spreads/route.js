import { NextResponse } from "next/server";
import { getSpreads, TABS } from "@/lib/spreads";

export async function GET(request) {
  const tab =
    request.nextUrl?.searchParams?.get("tab")?.toLowerCase() || "currencies";
  if (!TABS.includes(tab)) {
    return NextResponse.json({ error: "Invalid tab" }, { status: 400 });
  }

  try {
    const data = await getSpreads(tab);
    return NextResponse.json({ tab, data });
  } catch (err) {
    if (err.message === "WordPress request failed") {
      return NextResponse.json(
        { error: "WordPress request failed" },
        { status: 502 },
      );
    }
    if (err.message === "No table in post") {
      return NextResponse.json({ error: "No table in post" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Something went wrong", message: err.message },
      { status: 500 },
    );
  }
}
