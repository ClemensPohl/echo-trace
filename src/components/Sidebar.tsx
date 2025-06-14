export default function Sidebar({ game }: any) {
  return (
    <div className="space-y-6 text-terminal-fg">
      <div className="terminal-frame p-4">
        <h2 className="text-terminal-accent font-bold uppercase mb-2">Status</h2>
        <p>📍 Location: {game.location}</p>
        <p>❤️ Health: {game.health}</p>
        <p>🎒 Inventory: {game.inventory.join(", ") || "Empty"}</p>
        <p>🧩 Riddles Solved: {game.riddlesSolved}</p>
      </div>

      <div className="terminal-frame p-4">
        <h2 className="text-terminal-accent font-bold uppercase mb-2">Case File</h2>
        <p className="font-semibold">{game.caseId}</p>
        <p>{game.solved ? "✅ Solved" : "🔍 In Progress"}</p>
        <p className="mt-1">Progress: {Math.round(game.progress * 100)}%</p>
      </div>

      <div className="terminal-frame p-4">
        <h2 className="text-terminal-accent font-bold uppercase mb-2">Commands</h2>
        <ul className="text-sm list-disc list-inside space-y-1">
          <li>move [location]</li>
          <li>investigate</li>
          <li>analyze [item]</li>
          <li>solve [answer]</li>
          <li>solve mystery</li>
          <li>help</li>
          <li>inventory</li>
        </ul>
      </div>
    </div>
  );
}
