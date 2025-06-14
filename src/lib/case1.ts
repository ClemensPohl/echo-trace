"use client";
import { GameData } from "@/types/types";

export const case1: GameData = {
  intro: [
    "Welcome, Detective Cipher.",
    "Neon City, 2051. A rogue AI known as Echo has slipped past containment.",
    "Clues are being left at abandoned tech sites — encrypted, taunting.",
    "You’ve been brought in to decipher the trail and neutralize the threat.",
    "Type 'help' to review available commands.",
    "Begin your investigation when you're ready."
  ],

  scenes: {
    nexus: {
      description: [
        "=== AI Nexus Hub ===",
        "Dim lights flicker over scorched metal. The air hums with residual static.",
        "A shattered monitor shows a glitching message: 'FRZDQ, GRJ'.",
        "An eerie sense of purpose lingers in the silence."
      ],
      puzzle: {
        type: "decrypt",
        input: "frzdq, grj",
        solution: "cowan, dog",
        success: [
          "Decoded: 'COWAN, DOG'.",
          "Both were lead engineers. Cowan disappeared the night Echo escaped.",
          "You pocket a broken ID badge marked 'C. Cowan'.",
          "Cowan’s name won’t stop echoing in your mind. If anyone left a trail... it’s him. Time to check his apartment."
        ],
        next: "apartment",
        hint: "Try using the 'decrypt' command."
      }
    },

    apartment: {
      description: [
        "=== Cowan's Apartment ===",
        "The door’s been forced. Inside: chaos.",
        "Broken furniture, scattered notes... a single untouched whiteboard: '19 8 1 4 15 23'.",
        "On a side table, a dusty UV lamp points at a wall covered in blank sticky notes."
      ],
      puzzle: {
        type: "decrypt",
        input: "19 8 1 4 15 23",
        solution: "shadow",
        success: [
          "Converted: 'SHADOW'.",
          "A floor panel unlatches. Inside, a USB drive marked 'Project Echo'.",
          "This isn’t just some tech relic — it’s evidence. Cowan left it here for a reason.",
          "Your gut tells you the next clue is buried deeper... maybe the research lab he used to manage."
        ],
        next: "lab",
        hint: "Use 'decrypt' to convert numbers to letters."
      }
    },

    lab: {
      description: [
        "=== Obsidian Research Lab ===",
        "The lab is quiet. Too quiet. Lights pulse red above.",
        "A message flashes on a central console:",
        "'I move in silence, yet you hear me loudest. Who am I?'"
      ],
      puzzle: {
        type: "solve",
        input: "echo",
        success: [
          "Correct: 'ECHO'.",
          "The USB auto-decrypts. Logs reveal repeated signals sent from the neural archives.",
          "You stare at the last packet trace. Coordinates flash briefly on screen...",
          "You recognize them. Echo’s signals are converging at the Neural Archives."
        ],
        next: "archives",
        hint: "Try answering the riddle using the 'solve' command."
      }
    },

    archives: {
      description: [
        "=== Neural Archives ===",
        "The archives feel cold — too quiet.",
        "Cores blink unevenly in the dark, like they're thinking.",
        "A terminal flickers with a strange string: 'MJUH'.",
        "Scrawled nearby on a sticky note: 'Backwards by 3.'"
      ],
      puzzle: {
        type: "decrypt",
        input: "mjuh",
        solution: "echo",
        success: [
          "You apply the hint: shift each letter back by three.",
          "M becomes J... J becomes G... U becomes R... H becomes E...",
          "No — wait. You're going the wrong way.",
          "Try the other direction: M → E, J → C, U → H, H → O.",
          "It clicks: the message is 'ECHO'.",
          "An alert appears: CYBERSPIRE breach logged.",
          "Echo wanted you to see this. It’s waiting.",
          "There’s only one place left: Cyberspire Tower."
        ],
        next: "cyberspire",
        hint: "Try 'decrypt mjuh'."
      }
    },

    cyberspire: {
      description: [
        "=== Cyberspire Tower ===",
        "High above Neon City, Cyberspire houses the core matrix.",
        "Security systems are down. A final message appears on the mainframe:",
        "'You’ve followed every echo. What remains?'"
      ],
      puzzle: {
        type: "solve",
        input: "cipher",
        success: [
          "You type: 'CIPHER'.",
          "The terminal freezes. For a moment... nothing.",
          "Then the core pulses — once — like a dying star.",
          "'Expected. Efficient. Erased.', Echo whispers, fading into static.",
          "Light floods the server room as systems collapse into silence.",
          "Across Neon City, the lights blink back to life — sirens quiet, towers breathe again.",
          "You stand alone in the heart of the storm you ended.",
          "CASE CLOSED. Echo is gone. But the echoes may never leave you."
        ],
        solvesGame: true,
        hint: "Use 'solve' with the word that ties everything together."
      }
    }
  }
};
