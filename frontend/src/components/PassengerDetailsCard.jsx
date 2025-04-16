import { CirclePlus, CircleX } from "lucide-react";
import { useState } from "react";

import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Separator } from "@/ui/separator";

export default function PassengerDetailsCard() {
  const [pid, setPid] = useState(1);

  const [passengers, setPassengers] = useState([
    {
      id: pid,
      name: null,
      gender: null,
      phoneNumber: null,
      age: null,
    },
  ]);

  const handleAddPassenger = () => {
    setPid(pid + 1);
    setPassengers((prev) => [
      ...prev,
      { id: pid + 1, name: null, gender: null, phoneNumber: null, age: null },
    ]);
  };

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle>
          Passengers -{" "}
          <span className="text-[#e63946]">{passengers.length}</span> selected
        </CardTitle>
        <CardDescription>Add passenger details</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">
        <form className="flex flex-col gap-4">
          {passengers.map((passenger) => (
            <div
              key={passenger.id}
              className="px-4 py-5 flex flex-col gap-4 border-1 rounded-sm shadow relative"
            >
              <button
                type="button"
                className="focus:text-[#e63946] hover:text-[#e63946] text-gray-400 absolute top-[-0.6rem] left-[-0.7rem]"
              >
                <CircleX className="w-5 h-5" />
              </button>

              <div className="flex gap-4">
                <div className="flex flex-col gap-2 grow">
                  <Input id="name" placeholder="Name of as per Gov ID" />
                </div>
                <div className="flex flex-col gap-2">
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 grow">
                  <Input id="phone-number" placeholder="Phone number" />
                </div>
                <div className="flex flex-col gap-2">
                  <Input id="age" placeholder="Age in years" />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleAddPassenger}
            >
              <CirclePlus /> Add
            </Button>
          </div>
          <Separator />
          <Button type="submit" className="w-fit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
