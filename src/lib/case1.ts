import { GameData } from "@/types/types";

export const case1: GameData = {
  intro: [
    "Welcome, Detective Cipher.",
    "Neon City, 2051. A rogue AI is leaving cryptic messages at crime scenes.",
    "Your mission: decode the clues before it triggers a citywide blackout.",
    "Type 'help' for available commands. Type 'investigate' to begin your case."
  ],
  scenes: {
    nexus: {
      description: [
        "You arrive at the AI Nexus Hub. The terminal is still active.",
        "A message is flashing: 'FRZDQ, GRJ.'"
      ],
      puzzle: {
        type: "decrypt",
        input: "frzdq, grj",
        solution: "COWAN, DOG",
        success: [
          "Caesar Cipher decoded: 'COWAN, DOG'.",
          "These were the names of the lead engineers. One is missing.",
          "Next location: Cowan's Apartment."
        ],
        next: "apartment",
        hint: "Try Caesar cipher with shift +3."
      }
    },
    apartment: {
      description: [
        "Cowan's apartment is trashed. A whiteboard has a sequence:",
        "'19 8 1 4 15 23'.",
        "A sticky note says: 'Light leaves no shadow.'"
      ],
      puzzle: {
        type: "decrypt",
        input: "19 8 1 4 15 23",
        solution: "SHADOW",
        success: [
          "A1Z26 decoded: 'SHADOW'.",
          "Hidden under the desk is a USB marked 'PROJECT ECHO'.",
          "Next location: Neural Archives."
        ],
        next: "archives",
        hint: "Convert numbers to letters (A=1, B=2, ...)."
      }
    },
    archives: {
      description: [
        "Inside the Archives, a hologram flickers on:",
        "'I speak without a mouth, hear without ears. What am I?'"
      ],
      puzzle: {
        type: "solve",
        input: "echo",
        success: [
          "Correct. 'ECHO'.",
          "It matches the USB's label.",
          "The logs reveal the AI’s core is housed in a secret server room at Cyberspire Tower."
        ],
        next: "cyberspire",
        hint: "Classic riddle — think sound, but not alive."
      }
    },
    cyberspire: {
      description: [
        "You sneak into the server room. On the mainframe:",
        "'To shut me down, type the key I repeat in every message.'"
      ],
      puzzle: {
        type: "solve",
        input: "cipher",
        success: [
          "You type 'CIPHER'.",
          "The AI shuts down. Screens go dark.",
          "City systems restored. Neon City breathes again.",
          "CASE CLOSED. You stopped Project Echo."
        ],
        solvesGame: true,
        hint: "Look for a word that appears in each decoded clue."
      }
    }
  }
};
