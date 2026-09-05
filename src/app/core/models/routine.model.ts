export interface Routine {
  id: string;
  title: string;
  expectedTimeInMinutes: number | null;
  lastCompletedAt: string | null; // ISO Date string (e.g., "2026-09-06T00:30:00Z")
}