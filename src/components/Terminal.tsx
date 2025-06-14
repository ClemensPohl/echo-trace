"use client";
import { useEffect, useRef } from "react";
import { handleCommand } from "@/lib/gameEngine";

export default function Terminal({ game, setGame }: any) {
  const logRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    const newLog = handleCommand(game.input, game);
    setGame({ ...game, log: newLog, input: "" });
  };

  useEffect(() => {
    logRef.current?.scrollTo(0, logRef.current.scrollHeight);
  }, [game.log]);

  return (
<div className="terminal-frame flex flex-col justify-between w-full h-full p-6 relative scanlines text-terminal-fg">

  <h1 className="text-terminal-accent text-2xl mb-4 text-center font-bold tracking-wider glow-text">
    === CIPHER DETECTIVE TERMINAL ===
  </h1>

  {/* Log Area */}
  <div
    ref={logRef}
    className="flex-1 overflow-y-auto whitespace-pre-wrap text-sm pr-2 custom-scroll"
  >
    {game.log.map((line: string, i: number) => (
      <div key={i} className="leading-snug">{line}</div>
    ))}
  </div>

  {/* Command input bar with spacing from bottom */}
  <div className="mt-6 pt-4 border-t border-terminal-accent">
    <div className="flex items-center mt-2">
      <span className="text-terminal-accent font-semibold mr-2">detective@cipher:~$</span>
      <input
        className="flex-1 bg-terminal-bg border border-terminal-accent text-terminal-fg p-2 focus:outline-none focus:ring-2 focus:ring-terminal-accent rounded"
        value={game.input}
        onChange={(e) => setGame({ ...game, input: e.target.value })}
        onKeyDown={(e) => e.key === "Enter" && handleEnter()}
        placeholder="Enter command..."
      />
    </div>
  </div>
</div>
  );
}

