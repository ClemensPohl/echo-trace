import { CommandResult, GameState } from "@/types/types";
import { case1 } from "./case1";

export function handleCommand(input: string, state: GameState): CommandResult {
  const rawInput = input.trim();
  const normalizedInput = rawInput.toLowerCase().replace(/\s+/g, " ");
  const scene = case1.scenes[state.location];
  const newLog = [...state.log, `> ${rawInput}`];
  const updatedState: Partial<GameState> = {};

  if (state.solved) {
    if (normalizedInput === "restart") window.location.reload();
    else newLog.push("Case already solved. Type 'restart' to play again.");
    return { newLog };
  }

  if (normalizedInput === "help") {
    newLog.push(
      "Available commands:",
      "- investigate",
      "- decrypt [text]",
      "- solve [answer]",
      "- hint",
      "- inventory",
      "- scan",
      "- where",
      "- go [location]",
      "- restart"
    );
    return { newLog };
  }

  if (normalizedInput === "restart") {
    window.location.reload();
    return { newLog };
  }

  if (normalizedInput === "hint") {
    newLog.push(`Hint: ${scene?.puzzle?.hint ?? "No hint available."}`);
    return { newLog };
  }

  if (normalizedInput === "inventory") {
    newLog.push("🧳 Inventory:", ...(state.inventory.length ? state.inventory : ["(empty)"]));
    return { newLog };
  }

  if (normalizedInput === "scan") {
    newLog.push("📡 Scanning...", "System trace: clean. Electromagnetic distortion minimal.");
    return { newLog };
  }

  if (normalizedInput === "where") {
    newLog.push(`📍 Current: ${state.location}`);
    if (state.pendingMove) newLog.push(`➡️ Available: ${state.pendingMove} (type 'go ${state.pendingMove}')`);
    else newLog.push("🛑 No unlocked locations.");
    return { newLog };
  }

  if (normalizedInput.startsWith("go ")) {
    const dest = normalizedInput.slice(3);
    if (dest === state.pendingMove) {
      newLog.push(`🚪 Moving to ${dest}...`);
      updatedState.location = dest;
      updatedState.pendingMove = undefined;
      const nextScene = case1.scenes[dest];
      if (nextScene?.description) newLog.push(...nextScene.description);
      return { newLog, updatedState };
    } else {
      newLog.push("❌ You can't go there yet.");
      return { newLog };
    }
  }

  if (["investigate", "look", "examine", "inspect"].includes(normalizedInput)) {
    if (scene?.description) newLog.push(...scene.description);
    updatedState.hasInvestigated = true;
    return { newLog, updatedState };
  }

  if (!state.hasInvestigated) {
    newLog.push("You should investigate your surroundings first.");
    return { newLog };
  }

  // --- Puzzle handling ---
  const [action, ...rest] = normalizedInput.split(" ");
  const answer = rest.join(" ").trim();
  const puzzle = scene?.puzzle;

  if (puzzle) {
    const expectedAnswer = puzzle.input.trim().toLowerCase();

    const isCorrect =
      ((action === "decrypt" || action === "solve") && answer === expectedAnswer) ||
      (action === expectedAnswer); // Allow input like just "echo"

    if (isCorrect) {
      newLog.push(...puzzle.success);

      if (puzzle.next) {
        updatedState.pendingMove = puzzle.next;
      }

      if (puzzle.solvesGame) {
        updatedState.solved = true;
        updatedState.progress = 1;
      } else {
        updatedState.progress = Math.min(state.progress + 0.25, 0.99);
      }

      if (puzzle.inventoryItem) {
        updatedState.inventory = [...state.inventory, puzzle.inventoryItem];
      }

      if (
        updatedState.progress >= 0.5 &&
        puzzle.aiMessageTrigger &&
        !state.aiMessages.includes(puzzle.aiMessageTrigger)
      ) {
        newLog.push("🧠 Echo: You don’t know what you’re decrypting, Cipher.");
        updatedState.aiMessages = [...state.aiMessages, puzzle.aiMessageTrigger];
      }

      return { newLog, updatedState };
    }
  }

  const failedAttempts = state.failedAttempts ? state.failedAttempts + 1 : 1;
  updatedState.failedAttempts = failedAttempts;

  if (failedAttempts >= 3 && !state.aiMessages.includes("nudge")) {
    newLog.push("🧠 Echo: Lost already? Start by typing 'investigate'.");
    updatedState.aiMessages = [...state.aiMessages, "nudge"];
  } else {
    newLog.push("Unknown command or incorrect answer. Type 'hint' if you're stuck.");
  }

  return { newLog, updatedState };
}