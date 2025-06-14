export interface GameState {
  log: string[];
  input: string;
  location: string;
  health: number;
  inventory: string[];
  progress: number;
  caseId: string;
  solved: boolean;
  events: Record<string, any>;
}

export const initialState: GameState = {
  log: [
    "=== CIPHER DETECTIVE TERMINAL INITIALIZED ===",
    "",
    "Welcome, Detective Alex Cipher.",
    "",
    "You've been called to investigate a series of mysterious incidents in Neo Ashridge.",
    "Your reputation for solving complex puzzles and riddles precedes you.",
    "",
    "",
    "A new case file has been uploaded to your terminal...",
    "",
    "",
    "Type 'help' to see available commands or 'investigate' to begin.",
  ],
  input: "",
  location: "apartment",
  health: 100,
  inventory: [],
  progress: 0,
  caseId: "cipher-murders",
  solved: false,
  events: {},
};


export interface CommandResult {
  newLog: string[];
  updatedState?: Partial<GameState>;
}

export function handleCommand(input: string, state: GameState): CommandResult {
  const command = input.trim().toLowerCase();
  const newLog = [...state.log, `> ${command}`];

  switch (command) {
    case "help":
      return {
        newLog: [...newLog, "Available commands:", "- investigate", "- analyze [item]", "- solve [riddle]", "- examine [location]", "- help", "- inventory"]
      };
    case "investigate":
      return {
        newLog: [...newLog, "You approach the neon-lit alley where the body was found..."],
        updatedState: { progress: state.progress + 0.1 }
      };
    case "inventory":
      return {
        newLog: [...newLog, `Inventory: ${state.inventory.join(", ") || "Empty"}`]
      };
    default:
      return {
        newLog: [...newLog, "Unknown command. Type 'help' to see valid commands."]
      };
  }
}

