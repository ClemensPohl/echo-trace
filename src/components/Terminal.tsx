import { useEffect, useRef, useState } from "react";
import { handleCommand } from "@/lib/gameEngine";


export default function Terminal({ game, setGame }: any) {
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [typedLog, setTypedLog] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const isTyping = currentLineIndex < game.log.length;

  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus(); // <- NEW
      return;
    }

    const line = game.log[currentLineIndex] ?? "";

    if (line === "") {
      setTypedLog((prev) => [...prev, ""]);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
      return;
    }

    const timeout = setTimeout(() => {
      setTypedLog((prev) => {
        const updated = [...prev];
        const currentLine = updated[currentLineIndex] || "";
        const nextChar = line[currentCharIndex] ?? "";
        updated[currentLineIndex] = currentLine + nextChar;
        return updated;
      });

      if (currentCharIndex + 1 < line.length) {
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }, 10);

    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, isTyping, game.log]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [typedLog]);

  const handleEnter = () => {
    if (isTyping) return;

    const result = handleCommand(game.input, game);
    const updatedGame = {
      ...game,
      ...result.updatedState,
      log: result.newLog,
      input: "",
    };

    setCurrentLineIndex(typedLog.length);
    setCurrentCharIndex(0);
    setTypedLog([...typedLog]);
    setGame(updatedGame);
  };

  return (
    <div className="terminal-frame flex flex-col h-full w-full p-6 relative scanlines text-terminal-fg">
      <h1 className="text-terminal-accent text-2xl mb-4 text-center font-bold tracking-wider glow-text">
        ==== CIPHER DETECTIVE TERMINAL ====
      </h1>

      <div
        ref={logRef}
        className="flex-1 overflow-y-auto whitespace-pre-wrap text-sm pr-2 custom-scroll font-mono"
      >
        {typedLog.map((line, i) => (
          <div key={i} className="leading-snug">{line}</div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-terminal-accent">
        <div className="flex items-center mt-2">
          <span className="text-terminal-accent font-semibold mr-2">
            detective@cipher:~$
          </span>
          <input
            ref={inputRef} // <- NEW
            className="flex-1 bg-terminal-bg border border-terminal-accent text-terminal-fg p-2 focus:outline-none focus:ring-2 focus:ring-terminal-accent rounded caret-terminal-accent pr-4"
            value={game.input}
            onChange={(e) => setGame({ ...game, input: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleEnter()}
            placeholder={isTyping ? "Please wait..." : "Enter command..."}
            disabled={isTyping}
          />
        </div>
      </div>
    </div>
  );
}