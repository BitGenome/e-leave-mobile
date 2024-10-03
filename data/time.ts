export const time = [
  { label: "Full day", value: "full_day" },
  { label: "Haft day/morning", value: "haftday_morning" },
  { label: "Haft day/afternoon", value: "haftday_afternoon" },
];

export function getDurationLabel(value: string): string {
  const item = time.find((t) => t.value === value);
  return item ? item.label : "Unknown";
}
