export default function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [_, month, day, year] = date.split(" ");

  return `${year}-${months.indexOf(month) + 1}-${day}`;
}
