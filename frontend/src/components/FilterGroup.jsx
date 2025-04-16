/* eslint-disable react/prop-types */

import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";

export default function FilterGroup({ data }) {
  return (
    <ToggleGroup type="multiple" variant="outline">
      {data.map((item, idx) => (
        <ToggleGroupItem key={idx} value={item} aria-label={`Toggle ${item}`} size="lg">
          {item}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
