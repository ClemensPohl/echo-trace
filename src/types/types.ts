import { case1 } from "@/lib/case1";

export interface GamePuzzle {
  type: "solve" | "decrypt";
  input: string;
  solution?: string;
  success: string[];
  next?: string;
  solvesGame?: boolean;
  hint?: string;
  inventoryItem?: string;
}

export interface GameScene {
  description: string[];
  puzzle?: GamePuzzle;
}

export interface GameData {
  intro: string[];
  scenes: {
    [sceneName: string]: GameScene;
  };
}

export interface GameState {
  log: string[];
  input: string;
  location: string;
  solved: boolean;
  progress: number;
  inventory: string[];
  caseId: string;
  hasInvestigated: boolean;
  failedAttempts: number;
}

export interface CommandResult {
  newLog: string[];
  updatedState?: Partial<GameState>;
}

// --- Initial State ---
export const initialState: GameState = {
  log: [...case1.intro],
  input: "",
  location: "nexus",
  solved: false,
  progress: 0,
  inventory: [],
  caseId: "ECHO-1",
  hasInvestigated: false,
  failedAttempts: 0
};