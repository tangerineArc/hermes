import { ArrowRightLeft, LocateFixed, Navigation, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/ui/button";

import DatePicker from "../components/DatePicker.jsx";
import LocationInput from "../components/LocationInput.jsx";
import Navbar from "../components/Navbar.jsx";
import TrainCard from "../components/TrainCard.jsx";
import QuickFilters from "../components/QuickFilters.jsx";

export default function JourneyDetailsPage() {
  const [requestBody, setRequestBody] = useState({
    sourceStationCode: null,
    sourceStationName: null,
    destinationStationCode: null,
    destinationStationName: null,
    day: null,
    date: null,
  });
  const [stations, setStations] = useState({
    sourceStationCode: null,
    sourceStationName: null,
    destinationStationCode: null,
    destinationStationName: null,
  });

  const [trainsData, setTrainsData] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/trains/journey`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await res.json();
    setStations({
      sourceStationCode: requestBody.sourceStationCode,
      sourceStationName: requestBody.sourceStationName,
      destinationStationCode: requestBody.destinationStationCode,
      destinationStationName: requestBody.destinationStationName,
    });
    setTrainsData(data);
  };

  const handleRequestBodyChange = (entry) => {
    setRequestBody((prev) => ({ ...prev, ...entry }));
  };

  return (
    <div>
      <Navbar />

      <main className="py-4 flex flex-col gap-y-4">
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="flex gap-x-2">
            <LocationInput
              placeholder="From"
              symbol={<Navigation className="stroke-gray-400" />}
              requestBodyChangeHandler={handleRequestBodyChange}
            />

            <Button className="rounded-full h-9 w-9 hover:bg-[#e63946]">
              <ArrowRightLeft />
            </Button>

            <LocationInput
              placeholder="To"
              symbol={<LocateFixed className="stroke-gray-400" />}
              requestBodyChangeHandler={handleRequestBodyChange}
            />
          </div>

          <DatePicker requestBodyChangeHandler={handleRequestBodyChange} />

          <Button
            className="cursor-pointer flex items-center hover:bg-[#e63946]"
            onClick={handleSearch}
          >
            <Search />
            Search
          </Button>
        </div>

        <div className="flex items-start gap-4">
          <QuickFilters />

          <div className="gap-4 grid grid-cols-2">
            {trainsData.map((train) => (
              <TrainCard key={train.number} train={train} stations={stations} journeyDate={requestBody.date} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
