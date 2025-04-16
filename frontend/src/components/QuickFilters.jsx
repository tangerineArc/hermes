import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";

import FilterGroup from "./FilterGroup.jsx";
import Selector from "./Selector.jsx";

const sortingData = [
  { value: "duration-asc", label: "Duration: Shortest to Longest" },
  { value: "departure-asc", label: "Departure: Earliest to Late" },
  { value: "departure-desc", label: "Departure: Late to Earliest" },
  { value: "arrival-asc", label: "Arrival: Earliest to Late" },
  { value: "arrival-desc", label: "Arrival: Late to Earliest" },
];

const quotaData = [
  { value: "GN", label: "General" },
  { value: "LD", label: "Ladies" },
  { value: "HP", label: "Handicapped" },
  { value: "SS", label: "Senior Citizen" },
];

export default function QuickFilters() {
  return (
    <aside className="flex flex-col gap-y-4 border-2 p-4 min-w-2xs rounded-md shrink-0">
      <div className="flex gap-x-4 items-center justify-between">
        <div className="flex gap-x-2 items-center">
          <SlidersHorizontal className="w-5 h-5 stroke-[#e63946]" />
          Quick Filters
        </div>
        <Button
          variant="secondary"
          className="h-7 text-xs rounded-sm cursor-pointer"
        >
          Reset
        </Button>
      </div>
      <Separator />
      <div className="flex gap-x-2">
        <Selector header="Sort by" data={sortingData} />
        <Selector header="Quota" data={quotaData} />
      </div>
      <Separator />
      <div>
        <p className="ms-1 mb-2 text-sm">Class</p>
        <FilterGroup data={["CC", "EC", "2S", "SL", "3A", "2A", "3E", "1A"]} />
      </div>
      <Separator />
      <div>
        <p className="ms-1 mb-2 text-sm">Arrival Time</p>
        <FilterGroup data={["6 am - 12 pm", "6 pm - 12 am", "12 am - 6 am"]} />
      </div>
      <Separator />
      <div>
        <p className="ms-1 mb-2 text-sm">Departure Time</p>
        <FilterGroup data={["6 am - 12 pm", "6 pm - 12 am", "12 am - 6 am"]} />
      </div>
    </aside>
  );
}
