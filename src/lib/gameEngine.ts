import { CommandResult, GameState } from "@/types/types";
import { case1 } from "@/lib/case1";

export function handleCommand(input: string, state: GameState): CommandResult {
  const command = input.trim().toLowerCase();
  const scene = case1.scenes[state.location];
  const newLog = [...state.log, `> ${command}`];
  const updatedState: Partial<GameState> = {};

  if (state.solved) {
    if (command === "restart") window.location.reload();
    else newLog.push("Case already solved. Type 'restart' to play again.");
    return { newLog };
  }

  if (command === "help") {
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

  if (command === "restart") {
    window.location.reload();
    return { newLog };
  }

  if (command === "hint") {
    newLog.push(`Hint: ${scene?.puzzle?.hint ?? "No hint available."}`);
    return { newLog };
  }

  if (command === "inventory") {
    newLog.push("🧳 Inventory:", ...(state.inventory.length ? state.inventory : ["(empty)"]));
    return { newLog };
  }

  if (command === "scan") {
    newLog.push("📡 Scanning...", "System trace: clean. Electromagnetic distortion minimal.");
    return { newLog };
  }

  if (command === "where") {
    newLog.push(`📍 Current: ${state.location}`);
    if (state.pendingMove) newLog.push(`➡️ Available: ${state.pendingMove} (type 'go ${state.pendingMove}')`);
    else newLog.push("🛑 No unlocked locations.");
    return { newLog };
  }

  if (command.startsWith("go ")) {
    const dest = command.slice(3);
    if (dest === state.pendingMove) {
      newLog.push(`🚪 Moving to ${dest}...`);
      updatedState.location = dest;
      updatedState.pendingMove = undefined;
      return { newLog, updatedState };
    } else {
      newLog.push("❌ You can't go there yet.");
      return { newLog };
    }
  }

  if (command === "investigate") {
    if (scene?.description) newLog.push(...scene.description);
    else newLog.push("Nothing to investigate here.");
    return { newLog };
  }

  const [action, ...rest] = command.split(" ");
  const answer = rest.join(" ");
  const puzzle = scene?.puzzle;

  if (puzzle) {
    const { type, input: expectedInput, success, next, solvesGame } = puzzle;

    const isCorrect =
      (type === "decrypt" && command === `decrypt ${expectedInput}`) ||
      (type === "solve" && action === "solve" && answer === expectedInput);

    if (isCorrect) {
      newLog.push(...success);

      if (next) {
        newLog.push(`📍 Type 'go ${next}' to proceed.`);
        updatedState.pendingMove = next;
      }

      if (solvesGame) {
        updatedState.solved = true;
        updatedState.progress = 1;
      } else {
        updatedState.progress = Math.min(state.progress + 0.25, 0.99);
      }

      if (next === "archives") {
        updatedState.inventory = [...state.inventory, "USB: Project Echo"];
      }

      if (updatedState.progress >= 0.5 && !state.aiMessages.includes("warned")) {
        newLog.push("🧠 Echo: You don’t know what you’re decrypting, Cipher.");
        updatedState.aiMessages = [...state.aiMessages, "warned"];
      }

      return { newLog, updatedState };
    }
  }

  newLog.push("Unknown command or incorrect answer. Type 'hint' if you're stuck.");
  return { newLog };
}