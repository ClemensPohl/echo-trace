export type GameState = {
  log: string[];
  input: string;
  location: string;
  health: number;
  inventory: string[];
  progress: number; // 0–1 (e.g., 0.25 = 25%)
  caseId: string;
  solved: boolean;
  events: Record<string, boolean>; // for flags like riddle1Solved
};
