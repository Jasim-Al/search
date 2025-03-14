import AutoComplete from "@/components/AutoComplete/AutoComplete";
import DetailedView from "@/components/DetailedView/DetailedView";

export default function Home() {
  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8  sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <AutoComplete />
      </div>
      <DetailedView />
    </div>
  );
}
