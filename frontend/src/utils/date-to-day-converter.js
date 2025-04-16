export default function convertDateToDay(date) {
  const days = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  const d = new Date(date).toString().split(" ");
  return `${days[d[0]]}, ${d[1]} ${d[2]}`;
}
