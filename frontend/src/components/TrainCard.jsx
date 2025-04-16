/* eslint-disable react/prop-types */

import { ChevronRight, Dot, Hourglass } from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";

import getTimeDifference from "../utils/time-difference-calculator.js";

const selected = "text-[#000]";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

export default function TrainCard({ train, stations, journeyDate }) {
  const runningDays = train.days_running.split("-").map(Number);

  const params = new URLSearchParams({
    trainNumber: train.number,
    trainName: train.name,
    sourceStationCode: stations.sourceStationCode,
    destinationStationCode: stations.destinationStationCode,
    journeyDate,
    departureTime: train.departure_time,
    arrivalTime: train.arrival_time,
  });

  return (
    <Card className="w-lg rounded-sm">
      <CardHeader>
        <div className="flex gap-4 items-center">
          <p className="text-sm font-medium text-[#e63946]">{train.number}</p>
          <CardTitle>{train.name}</CardTitle>
        </div>
        <Separator className="my-2" />

        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-400 flex gap-2">
            {days.map((day, idx) => (
              <span
                key={day}
                className={runningDays.includes(idx + 1) ? selected : ""}
              >
                {day[0]}
              </span>
            ))}
          </div>
          <div className="text-sm font-medium flex items-center gap-0.5">
            Time Table
            <ChevronRight className="h-4 w-4 shrink-0 stroke-[#e63946] mt-[0.2rem]" />
          </div>
        </div>
        <Separator className="my-2" />

        <div className="flex justify-between items-center gap-2">
          <div>
            <div className="flex gap-2 items-center">
              <span className="text-sm">{stations.sourceStationCode}</span>
              <span className="font-medium">
                {train.departure_time.slice(0, 5)}
              </span>
            </div>
            <div className="text-sm">{stations.sourceStationName}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-sm font-medium">
              <Hourglass className="w-3 h-3 stroke-[#e63946]" />{" "}
              {getTimeDifference(train.departure_time, train.arrival_time)}
            </div>
            <div className="text-sm flex gap-0.5 font-medium">
              {train.num_halts} halts <Dot className="stroke-[#e63946]" />{" "}
              {train.total_distance} km
            </div>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <span className="font-medium">
                {train.arrival_time.slice(0, 5)}
              </span>
              <span className="text-sm">{stations.destinationStationCode}</span>
            </div>
            <div className="text-right text-sm">
              {stations.destinationStationName}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {Object.keys(train.seat_availability).map((item, idx) => (
          <div
            key={idx}
            className="border-2 flex flex-col px-3 py-2 rounded-sm min-w-[13.5rem] shrink-0"
          >
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold">{item}</span>
                <span className="font-medium">{seatMap[item]}</span>
              </div>
              <span className="text-[#e63946] font-medium">
                ₹ {train.seat_availability[item].fare}
              </span>
            </div>
            <div className="my-2">
              {train.seat_availability[item].available_seats} available
            </div>
            <Link
              to={`/reserve-tickets?${params.toString()}&classCode=${item}&fare=${
                train.seat_availability[item].fare
              }`}
            >
              <Button className="text-xs rounded-sm mb-1 cursor-pointer w-full">
                Book Now
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
