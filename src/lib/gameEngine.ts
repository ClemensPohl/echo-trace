import type { CommandResult, GameData, GameState } from "@/types/types";
import {case1} from "@/lib/case1";


export function handleCommand(input: string, state: GameState): CommandResult {
  const gameData: GameData = case1;
  const command = input.trim().toLowerCase();
  const newLog = [...state.log, `> ${command}`];

  const updatedState: Partial<GameState> = {};
  
  const scene = gameData.scenes[state.location];

  if (state.solved) {
    newLog.push("Case already solved. Type 'restart' to play again.");
    return { newLog };
  }

  if (command === "help") {
    newLog.push(
      "Available commands:",
      "- investigate",
      "- decrypt [text]",
      "- solve [answer]",
      "- hint"
    );
    return { newLog };
  }

  if (command === "restart") {
    window.location.reload();
    return { newLog };
  }

  if (command === "hint") {
    const hint = scene?.puzzle?.hint || "No hint available.";
    newLog.push(`Hint: ${hint}`);
    return { newLog };
  }

  if (command === "investigate") {
    if (scene?.description) {
      newLog.push(...scene.description);
    } else {
      newLog.push("Nothing to investigate here.");
    }
    return { newLog };
  }

  const [action, ...rest] = command.split(" ");
  const answer = rest.join(" ");

  if (scene?.puzzle) {
    const { type, input, solution, success, next, solvesGame } = scene.puzzle;

    const isCorrect = (
      (type === "decrypt" && command === `decrypt ${input}`) ||
      (type === "solve" && action === "solve" && answer === input)
    );

    if (isCorrect) {
      newLog.push(...success);
      if (next) updatedState.location = next;
      if (solvesGame) {
        updatedState.solved = true;
        updatedState.progress = 1;
      } else {
        updatedState.progress = state.progress + 0.2;
      }
      return { newLog, updatedState };
    }
  }

  newLog.push("Unknown command or incorrect answer. Type 'hint' if you're stuck.");
  return { newLog };
}
