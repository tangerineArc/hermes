/* eslint-disable react/prop-types */

import { Dot, TramFront } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

import convertDateToDay from "../utils/date-to-day-converter.js";
import getTimeDifference from "../utils/time-difference-calculator.js";

const seatMap = {
  "1A": "First AC",
  "2A": "Second AC",
  "3A": "Third AC",
  "3E": "Third AC Economy",
  EC: "AC Executive",
  CC: "AC Chair Car",
  SL: "Sleeper",
  "2S": "Second Seating",
};

export default function JourneyDetailsCard({ data }) {
  return (
    <Card className="rounded-sm py-0 gap-0">
      <CardHeader className="border-b-1 py-5">
        <CardTitle className="flex justify-between">
          <div className="flex items-center text-gray-600">
            {data.trainNumber} <Dot className="stroke-[#e63946]" />
            {data.trainName}
          </div>
          <div>
            <span className="font-medium text-[#e63946]">₹ </span>
            <span>{data.fare}</span>
            <span className="text-sm"> / person</span>
          </div>
        </CardTitle>
        <CardDescription className="font-medium">
          {seatMap[data.classCode]} ({data.classCode}) | General Quota
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between py-5 border-b-1 items-center">
        <div className="flex flex-col gap-1">
          <span className="text-sm">{convertDateToDay(data.journeyDate)}</span>
          <span className="flex font-medium">
            {data.departureTime.slice(0, 5)}{" "}
            <Dot className="stroke-[#e63946]" /> {data.sourceStationCode}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="flex gap-2 text-[#e63946] items-center">
            —<TramFront className="stroke-[#e63946] w-5 h-5" />—
          </span>
          <span className="text-sm font-medium">
            {getTimeDifference(data.departureTime, data.arrivalTime)}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm">{convertDateToDay(data.journeyDate)}</span>
          <span className="flex font-medium">
            {data.arrivalTime.slice(0, 5)} <Dot className="stroke-[#e63946]" />{" "}
            {data.destinationStationCode}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
