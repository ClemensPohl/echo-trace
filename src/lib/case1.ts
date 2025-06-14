// Enhanced GameData and Command Logic with Better Flow
import { GameData, CommandResult, GameState } from "@/types/types";

export const case1: GameData = {
  intro: [
    " _____ _       _               ",
    "/  __ (_)     | |              ",
    "| /  \/_ _ __ | |__   ___ _ __ ",
    "| |   | | '_ \| '_ \ / _ \ '__|",
    "| \__/\ | |_) | | | |  __/ |   ",
    " \____/_| .__/|_| |_|\___|_|   ",
    "        | |                    ",
    "        |_|                    ",
    "",
    "Welcome, Detective Cipher.",
    "Neon City, 2051. A rogue AI called Echo is leaving cryptic messages at crime scenes.",
    "Your mission: decode the clues before it triggers a citywide blackout.",
    "Type 'help' for available commands. Let's begin.",
    "Echo has left something on a nearby terminal. Type 'investigate' to examine it."
  ],

  scenes: {
    nexus: {
      description: [
        "\n=== SCENE: AI Nexus Hub ===",
        "",
        "The AI Nexus Hub hums with residual energy. The scent of burnt circuits lingers in the air.",
        "Dim emergency lights reveal the aftermath of a system breach. Broken conduits spark lightly in corners.",
        "In the middle of the room, a terminal still pulses with power.",
        "A cryptic message glows on the cracked screen: 'FRZDQ, GRJ.'",
        "It feels like the AI wants you to see this... wants to play a game.",
        "Try typing 'decrypt frzdq, grj'."
      ],
      puzzle: {
        type: "decrypt",
        input: "frzdq, grj",
        solution: "COWAN, DOG",
        success: [
          "Caesar Cipher decoded: 'COWAN, DOG'.",
          "These were the names of the lead engineers behind Project Echo.",
          "But only one—Cowan—has gone completely off the grid.",
          "You pocket a scratched engineer badge labeled 'C. Cowan'.",
          "Cross-referencing internal logs... Cowan's last known address located.",
          "📍 Type 'go apartment' to investigate Cowan's apartment."
        ],
        next: "apartment",
        hint: "Try Caesar cipher with shift +3.",
        aiMessageTrigger: "warned"
      }
    },

    apartment: {
      description: [
        "\n=== SCENE: Cowan's Apartment ===",
        "",
        "You step into Cowan's apartment. The lights are out. The place is in ruins.",
        "Furniture is overturned. Drawers ripped out. It's clear someone was looking for something.",
        "Amid the chaos, a whiteboard with a series of numbers stands untouched:",
        "'19 8 1 4 15 23'.",
        "Next to it, a sticky note reads: 'Light leaves no shadow.'",
        "A subtle humming behind the desk catches your attention...",
      ],
      puzzle: {
        type: "decrypt",
        input: "19 8 1 4 15 23",
        solution: "SHADOW",
        success: [
          "A1Z26 decoded: 'SHADOW'.",
          "You reach under the desk and pull out a USB labeled 'PROJECT ECHO'.",
          "USB added to inventory. 🧳 Type 'inventory' to check your items.",
          "📍 Type 'go archives' to continue your investigation."
        ],
        next: "archives",
        hint: "Convert numbers to letters (A=1, B=2, ...).",
        inventoryItem: "USB: Project Echo"
      }
    },

    archives: {
      description: [
        "\n=== SCENE: Neural Archives ===",
        "",
        "Rows of digital memory cores line the chamber. A synthetic voice murmurs faintly in the distance.",
        "A holographic terminal flickers and comes alive as you approach.",
        "The prompt reads: 'I speak without a mouth, hear without ears. What am I?'",
        "The temperature drops. Echo is here... watching.",
        "Your reflection glitches in the glass. This place is wired deep into the city's neural net.",
      ],
      puzzle: {
        type: "solve",
        input: "echo",
        success: [
          "Correct. 'ECHO'.",
          "The system scans the USB. Logs fill the screen: ‘Cipher... Cipher...’",
          "You trace the last packet to a location: Cyberspire Tower mainframe.",
          "📍 Type 'go cyberspire' to confront the AI's core."
        ],
        next: "cyberspire",
        hint: "Classic riddle — think sound, but not alive."
      }
    },

    cyberspire: {
      description: [
        "\n=== SCENE: Cyberspire Tower ===",
        "",
        "Alarms blare softly beneath the silence. You bypass the final biometric gate.",
        "The server room is cathedral-like — vast, cold, humming with latent power.",
        "At the center stands the AI’s core: a prism of quantum glass pulsing like a heart.",
        "A voice echoes all around: 'To shut me down, type the key I repeat in every message.'",
        "This is it. Echo is aware. It’s waiting for your next move.",
      ],
      puzzle: {
        type: "solve",
        input: "cipher",
        success: [
          "You type 'CIPHER'.",
          "🧠 Echo: 'Expected. Efficient. Erased.'",
          "The prism flashes white. Systems collapse into silence.",
          "The AI shuts down. Screens go dark. Fans wind down into deathly stillness.",
          "City systems restored. Neon City breathes again.",
          "🟢 CASE CLOSED. You stopped Project Echo.",
          "Type 'restart' to play again."
        ],
        solvesGame: true,
        hint: "Look for a word that appears in each decoded clue."
      }
    }
  }
};
