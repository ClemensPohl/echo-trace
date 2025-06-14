"use client";
import { useState, useEffect } from "react";
import { initialState } from "@/lib/data";
import { loadGame, saveGame } from "@/lib/storage";
import Terminal from "@/components/Terminal";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [game, setGame] = useState(initialState);

  useEffect(() => {
    const saved = loadGame();
    if (saved) setGame(saved);
  }, []);

  useEffect(() => {
    saveGame(game);
  }, [game]);

  return (
    <main className="min-h-screen grid md:grid-cols-3 p-6 bg-background text-terminal-fg font-mono">
      <Terminal game={game} setGame={setGame} />
      <Sidebar game={game} />
    </main>
  );
}
