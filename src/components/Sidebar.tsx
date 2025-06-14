export default function Sidebar({ game }: any) {
  return (
    <div className="space-y-6">
      <div className="border border-terminal-accent p-4 rounded shadow-terminal bg-terminal-bg">
        <h2 className="text-terminal-accent font-bold uppercase mb-2">Status</h2>
        <p>Location: {game.location}</p>
        <p>Health: {game.health}</p>
        <p>Inventory: {game.inventory.join(", ") || "Empty"}</p>
      </div>
      <div className="border border-terminal-accent p-4 rounded shadow-terminal bg-terminal-bg">
        <h2 className="text-terminal-accent font-bold uppercase mb-2">Progress</h2>
        <p>{Math.round(game.progress * 100)}%</p>
        <p>{game.solved ? "Case Solved" : "In Progress"}</p>
      </div>
    </div>
  );
}
