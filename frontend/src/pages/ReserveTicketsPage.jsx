import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import JourneyDetailsCard from "../components/JourneyDetailsCard.jsx";
import PassengerDetailsCard from "../components/PassengerDetailsCard.jsx";

export default function ReserveTicketsPage() {
  const [searchParams] = useSearchParams();
  const data = Object.fromEntries(searchParams.entries());

  return (
    <div>
      <Navbar />

      <main className="flex flex-col gap-4">
        <JourneyDetailsCard data={data} />
        <PassengerDetailsCard />
      </main>
    </div>
  );
}
