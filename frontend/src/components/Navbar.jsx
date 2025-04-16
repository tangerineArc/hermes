import {
  CalendarSearch,
  Compass,
  FlagTriangleRight,
  Hash,
  Percent,
  Sofa,
  TicketSlash,
  TramFront,
  Waypoints,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/ui/navigation-menu";

const trainInfoItems = [
  {
    icon: <TramFront strokeWidth={2.5} stroke="#e63946" />,
    title: "Live Train Status",
    href: "/docs/primitives/alert-dialog",
    description:
      "Check the real-time status of trains, including delays, arrivals, and departures.",
  },
  {
    icon: <Hash strokeWidth={2.5} stroke="#e63946" />,
    title: "PNR Status",
    href: "/docs/primitives/hover-card",
    description:
      "Track your booking status by entering the Passenger Name Record (PNR) number.",
  },
  {
    icon: <CalendarSearch strokeWidth={2.5} stroke="#e63946" />,
    title: "Time Table",
    href: "/docs/primitives/progress",
    description:
      "View the full schedule of train arrivals, departures, and other important timings.",
  },
  {
    icon: <Waypoints strokeWidth={2.5} stroke="#e63946" />,
    title: "Train between Stations",
    href: "/docs/primitives/scroll-area",
    description:
      "Find available trains operating between your selected stations for a specific date and time.",
  },
  {
    icon: <Sofa strokeWidth={2.5} stroke="#e63946" />,
    title: "Seat Availability",
    href: "/docs/primitives/tabs",
    description:
      "Check if there are available seats for a particular train, date, and class.",
  },
  {
    icon: <FlagTriangleRight strokeWidth={2.5} stroke="#e63946" />,
    title: "Arrival & Departure Timings",
    href: "/docs/primitives/tooltip",
    description:
      "Get information about the expected arrival and departure times of trains at stations.",
  },
];

const moreInfoItems = [
  {
    icon: <Percent strokeWidth={2.5} stroke="#e63946" />,
    title: "Offers & Discounts",
    href: "/docs/primitives/tooltip",
    description:
      "View available discounts, promotions, and special offers for train bookings.",
  },
  {
    icon: <TicketSlash strokeWidth={2.5} stroke="#e63946" />,
    title: "Cancellations & Refunds",
    href: "/docs/primitives/tooltip",
    description:
      "Cancel tickets, request refunds, and track your refund status.",
  },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center px-2 py-4 gap-x-4">
      <Link to="/">
        <div className="flex gap-x-2 items-center">
          <Compass stroke="#e63946" className="w-5 h-5" strokeWidth={2.5} />
          <p className="font-(family-name:--font-logo) text-lg font-medium">
            Hermes
          </p>
        </div>
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link to="/journey-details">Train Tickets</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Train Info</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {trainInfoItems.map((item, idx) => (
                  <li key={idx}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        className="block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-x-2 text-sm font-medium leading-none">
                          {item.icon} {item.title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>More Info</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {moreInfoItems.map((item, idx) => (
                  <li key={idx}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        className="block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-x-2 text-sm font-medium leading-none">
                          {item.icon} {item.title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link to="/sign-in">Sign In</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link to="/sign-up">Sign Up</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
