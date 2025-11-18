export const STEPS = [
  "Requested",
  "Allocated",
  "Client",
  "Processing",
  "Provider",
];

export const STATUS_TO_STEP: Record<string, number> = {
  Requested: 0,
  Allocated: 1,
  "Sent to Client": 2,
  Processing: 3,
  "Sent to Provider": 4,
  Completed: 5,  // beyond last step → hide timeline
  Cancelled: 5,
};