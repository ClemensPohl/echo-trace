import type { GameState } from "@/types/types";

export default function Sidebar({ game }: { game: GameState }) {
  return (
    <div className="space-y-6 text-terminal-fg">
      {/* STATUS */}
      <div className="terminal-frame p-4">
        <h2 className="text-terminal-accent font-bold uppercase mb-2">Status</h2>
        <p className="font-semibold">Case File {game.caseId}</p>
        <p>Location: {game.location}</p>
        <p>Progress: {Math.round(game.progress * 100)}%</p>
        <p>{game.solved ? "Solved" : "In Progress"}</p>
      </div>

      {/* COMMAND LIST */}
      <div className="terminal-frame p-4">
        <h2 className="text-terminal-accent font-bold uppercase mb-2">Commands</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>investigate</li>
          <li>decrypt [text]</li>
          <li>solve [answer]</li>
          <li>hint</li>
          <li>inventory</li>
          <li>restart</li>
        </ul>
      </div>
    </div>
  );
}
