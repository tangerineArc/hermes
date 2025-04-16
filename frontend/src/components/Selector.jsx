/* eslint-disable react/prop-types */

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

export default function Selector({ header, data }) {
  return (
    <Select>
      <SelectTrigger className="max-w-36">
        <SelectValue placeholder={header} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{header}</SelectLabel>
          {data.map((item, idx) => (
            <SelectItem key={idx} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
