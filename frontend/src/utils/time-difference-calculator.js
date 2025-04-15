export default function getTimeDifference(start, end) {
  const [sh, sm] = start.split(":").map(Number);
  let [eh, em] = end.split(":").map(Number);

  if (eh < sh) {
    eh += 24;
  }

  if (em < sm) {
    em += 60;
    if (--eh < 0) {
      eh = 23;
    }
  }

  return `${eh - sh}h ${em - sm}m`;
}
