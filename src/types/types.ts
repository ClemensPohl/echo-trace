import { case1 } from "@/lib/case1";


export interface GameState {
  log: string[];
  input: string;
  location: string; 
  solved: boolean;
  progress: number; // 0 to 1
}

export interface CommandResult {
  newLog: string[];
  updatedState?: Partial<GameState>;
}


export const initialState: GameState = {
  log: [...case1.intro],
  input: "",
  location: "nexus",
  solved: false,
  progress: 0
};



// JSON TYPEs

export interface GamePuzzle {
  type: "solve" | "decrypt";
  input: string;
  solution?: string; // Optional if input is already enough
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
