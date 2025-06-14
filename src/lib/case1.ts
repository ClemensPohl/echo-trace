import { GameData } from "@/types/types"; // adjust the path if needed

export const case1: GameData = {
  intro: [
    "Welcome, Detective Alex Cipher.",
    "The year is 2048. A string of murders has shaken Neon City.",
    "Each scene leaves behind a riddle or cipher.",
    "Type 'help' to see commands. Type 'investigate' to begin."
  ],
  scenes: {
    office: {
      description: [
        "You begin at your desk. A new case file arrives.",
        "You receive a call: there's a murder in the alley."
      ],
    },
    alley: {
      description: [
        "A body lies in the alley, clutching a note.",
        "The note reads: 'KHOOR, FLSKHU.'"
      ],
      puzzle: {
        type: "decrypt",
        input: "khoor, flskhu",
        solution: "HELLO, CIPHER",
        success: [
          "Caesar Cipher decoded: 'HELLO, CIPHER.'",
          "The killer knows your name.",
          "Next location: Metro Station."
        ],
        next: "metro",
        hint: "Try Caesar cipher (+3)."
      }
    },
    metro: {
      description: [
        "The metro station is abandoned.",
        "Spray-painted on a wall is the riddle:",
        "'I have keys but no locks, space but no room... What am I?'"
      ],
      puzzle: {
        type: "solve",
        input: "keyboard",
        success: [
          "Correct. You find a USB marked 'Next Move'.",
          "Next location: Library Rooftop."
        ],
        next: "library",
        hint: "Think of something you type on."
      }
    },
    library: {
      description: [
        "On the rooftop, you find a chess bishop.",
        "Inside: a coded message '3 9 16 8 5 18'"
      ],
      puzzle: {
        type: "decrypt",
        input: "3 9 16 8 5 18",
        solution: "CIPHER",
        success: [
          "A1Z26 decoded: 'CIPHER'. Again, your name.",
          "Final location: The Chess Club."
        ],
        next: "finale",
        hint: "Convert numbers to letters (A=1)."
      }
    },
    finale: {
      description: [
        "You find the Rook’s hideout.",
        "One final riddle awaits:",
        "'The more you take, the more you leave behind. What am I?'"
      ],
      puzzle: {
        type: "solve",
        input: "footsteps",
        success: [
          "Correct. You found the Rook. He surrenders peacefully.",
          "CASE CLOSED. Well done, Detective Cipher."
        ],
        solvesGame: true,
        hint: "Think of something that follows you when you walk."
      }
    }
  }
};
