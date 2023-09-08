export function convertMinutesToHoursAndMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}:${
    remainingMinutes < 10 ? `${remainingMinutes}0` : remainingMinutes
  }`;
}
