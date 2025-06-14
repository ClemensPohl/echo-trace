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
    <div className="md:col-span-2 p-6 border border-terminal-accent rounded shadow-terminal bg-terminal-bg">
      <h1 className="text-terminal-accent text-2xl mb-4 text-center font-bold glow-text">CIPHER DETECTIVE TERMINAL</h1>
      <div ref={logRef} className="h-[400px] overflow-y-auto whitespace-pre-wrap text-sm mb-4 pr-2">
        {game.log.map((line: string, i: number) => <div key={i}>{line}</div>)}
      </div>
      <div className="flex">
        <span className="text-terminal-accent mr-2">detective@cipher:~$</span>
        <input
          className="flex-1 bg-terminal-bg border border-terminal-accent text-terminal-fg p-2"
          value={game.input}
          onChange={(e) => setGame({ ...game, input: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleEnter()}
        />
      </div>
    </div>
  );
}
