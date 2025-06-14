import { case1 } from "@/lib/case1";

export interface GameState {
  log: string[];
  input: string;
  location: string;
  solved: boolean;
  progress: number;
  inventory: string[];
  aiMessages: string[];
  caseId: string;
  pendingMove?: string; // NEW
}

export interface CommandResult {
  newLog: string[];
  updatedState?: Partial<GameState>;
  onComplete?: () => void;
}

export interface GamePuzzle {
  type: "solve" | "decrypt";
  input: string;
  solution?: string;
  success: string[];
  next?: string;
  solvesGame?: boolean;
  hint?: string;
}

export interface GameScene {
  description?: string[];
  puzzle?: GamePuzzle;
}

export interface GameData {
  intro: string[];
  scenes: {
    [sceneName: string]: GameScene;
  };
}


export const initialState: GameState = {
  log: [...case1.intro],
  input: "",
  location: "nexus",
  solved: false,
  progress: 0,
  inventory: [],
  aiMessages: [],
  caseId: "ECHO-1",
};