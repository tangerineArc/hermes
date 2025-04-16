/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

import formatDate from "../utils/date-formatter.js";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DatePicker({ requestBodyChangeHandler }) {
  const [date, setDate] = useState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[180px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="stroke-gray-400" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d);
            requestBodyChangeHandler({
              day: (days.indexOf(d.toString().split(" ")[0]) + 1).toString(),
              date: formatDate(d.toString()),
            });
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
