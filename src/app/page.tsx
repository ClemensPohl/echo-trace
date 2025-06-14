"use client";
import { useState} from "react";
import Terminal from "@/components/Terminal";
import Sidebar from "@/components/Sidebar";
import { initialState } from "@/types/types";

export default function Home() {
  const [game, setGame] = useState(initialState);


  return (
<main className="h-screen flex gap-10 px-10 py-8 bg-background text-terminal-fg font-mono">
  <div className="flex-1 flex">
    <Terminal game={game} setGame={setGame} />
  </div>
  <div className="w-[320px]">
    <Sidebar game={game} />
  </div>
</main>

  );
}
