"use client";
import { CommandResult, GameState } from "@/types/types";
import { case1 } from "./case1";

export function handleCommand(input: string, state: GameState): CommandResult {
  const normalizedInput = input.trim().toLowerCase();
  const scene = case1.scenes[state.location];
  const newLog = [...state.log, `> ${input}`];
  const updatedState: Partial<GameState> = {};

  if (state.solved) {
    newLog.push("Case already solved. Type 'restart' to play again.");
    return { newLog };
  }

  // --- Help ---
  if (normalizedInput === "help") {
    newLog.push(
      "Available commands:",
      "- investigate",
      "- decrypt [text] / solve [answer]",
      "- hint",
      "- inventory"
    );
    return { newLog };
  }

  // --- Restart ---
  if (normalizedInput === "restart") {
    window.location.reload();
    return { newLog };
  }

  // --- Inventory ---
  if (normalizedInput === "inventory") {
    newLog.push("🧳 Inventory:", ...(state.inventory.length ? state.inventory : ["(empty)"]));
    return { newLog };
  }

  // --- Investigate ---
  if (normalizedInput === "investigate") {
    newLog.push(...scene.description);
    updatedState.hasInvestigated = true;
    return { newLog, updatedState };
  }

  // --- Prevent all puzzle-related commands before investigating ---
  if (!state.hasInvestigated) {
    newLog.push("You should investigate first. Try 'investigate'.");
    return { newLog };
  }

  // --- Hint (only after investigation) ---
  if (normalizedInput === "hint") {
    newLog.push(`Hint: ${scene.puzzle?.hint ?? "No hint available."}`);
    return { newLog };
  }

  // --- Puzzle Handling ---
  const [action, ...rest] = normalizedInput.split(" ");
  const answer = rest.join(" ").trim();
  const puzzle = scene.puzzle;

  if (puzzle) {
    const isCorrect =
      ((action === "decrypt" || action === "solve") && answer === puzzle.input.toLowerCase()) ||
      normalizedInput.replace(/\s+/g, "") === puzzle.solution?.toLowerCase().replace(/\s+/g, "") ||
      normalizedInput === puzzle.input.toLowerCase();

    if (isCorrect) {
      newLog.push(...puzzle.success);

      if (puzzle.inventoryItem) {
        updatedState.inventory = [...state.inventory, puzzle.inventoryItem];
      }

      if (puzzle.next) {
        updatedState.location = puzzle.next;
        updatedState.hasInvestigated = false;
      }

      if (puzzle.solvesGame) {
        updatedState.solved = true;
        updatedState.progress = 1;
      } else {
        updatedState.progress = Math.min(state.progress + 0.25, 0.99);
      }

      return { newLog, updatedState };
    }
  }

  // --- Wrong Input ---
  updatedState.failedAttempts = state.failedAttempts + 1;
  newLog.push("Incorrect. Try 'hint' if you're stuck.");
  return { newLog, updatedState };
}
