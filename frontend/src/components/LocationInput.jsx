/* eslint-disable react/prop-types */

import { Check, ChevronsUpDown, Navigation } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

export default function LocationInput({
  placeholder,
  symbol,
  requestBodyChangeHandler,
}) {
  const [open, setOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState("");
  const [stations, setStations] = useState([]);

  const searchStations = async (event) => {
    const matcher = event.currentTarget.value;
    if (!matcher) {
      setStations([]);
      return;
    }

    const res = await fetch(
      `${
        import.meta.env.VITE_API_SERVER_URL
      }/stations/search?matcher=${matcher}`
    );

    const data = await res.json();
    setStations(data);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <div className="flex items-center gap-x-2 truncate max-w-full">
            {symbol}
            {selectedStation
              ? stations.find((station) => station.code === selectedStation)
                  ?.name
              : placeholder}
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            onInput={(e) => searchStations(e)}
            placeholder="Search station..."
          />

          <CommandList>
            <CommandEmpty>No stations found</CommandEmpty>
            <CommandGroup>
              {stations.map((station) => (
                <CommandItem
                  key={station.code}
                  value={station.code}
                  onSelect={(currentValue) => {
                    setSelectedStation(
                      currentValue === selectedStation ? "" : currentValue
                    );
                    if (placeholder === "From") {
                      requestBodyChangeHandler({
                        sourceStationCode: station.code,
                        sourceStationName: station.name,
                      });
                    } else {
                      requestBodyChangeHandler({
                        destinationStationCode: station.code,
                        destinationStationName: station.name,
                      });
                    }
                    setOpen(false);
                  }}
                >
                  {station.code} - {station.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedStation === station.code
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
