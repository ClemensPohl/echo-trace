import type { GameState } from "@/types/types";

export default function Sidebar({ game }: { game: GameState }) {
  return (
    <div className="space-y-6 text-terminal-fg">
      {/* STATUS PANEL */}
      <div className="terminal-frame p-4">
        <h2 className="text-terminal-accent font-bold uppercase mb-2">Status</h2>
        <p>📍 Location: {game.location}</p>
      </div>

      {/* CASE FILE PANEL */}
      <div className="terminal-frame p-4">
        <h2 className="text-terminal-accent font-bold uppercase mb-2">Case File</h2>
        <p className="font-semibold">Case-001</p>
        <p>{game.solved ? "✅ Solved" : "🔍 In Progress"}</p>
        <p className="mt-1">Progress: {Math.round(game.progress * 100)}%</p>
      </div>

      {/* COMMANDS PANEL */}
      <div className="terminal-frame p-4">
        <h2 className="text-terminal-accent font-bold uppercase mb-2">Commands</h2>
        <ul className="text-sm list-disc list-inside space-y-1">
          <li>investigate</li>
          <li>decrypt [text]</li>
          <li>solve [answer]</li>
          <li>hint</li>
          <li>restart</li>
        </ul>
      </div>
    </div>
  );
}
