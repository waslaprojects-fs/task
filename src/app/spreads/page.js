import Header from "../components/header";
import SpreadsContent from "./SpreadsContent";
import { getSpreads, TABS } from "@/lib/spreads";

export default async function SpreadsPage() {
  const results = await Promise.allSettled(
    TABS.map(async (tab) => {
      const data = await getSpreads(tab);
      return { tab, data };
    }),
  );

  const dataByTab = {};
  const errorsByTab = {};
  results.forEach((result, i) => {
    const tab = TABS[i];
    if (result.status === "fulfilled") {
      dataByTab[tab] = result.value.data;
    } else {
      errorsByTab[tab] = result.reason?.message ?? "Request failed";
    }
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Header />
      <SpreadsContent
        initialDataByTab={dataByTab}
        initialErrorsByTab={errorsByTab}
      />
    </div>
  );
}
