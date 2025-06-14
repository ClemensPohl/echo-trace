const STORAGE_KEY = "cipher_game_state";

export function saveGame(state: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function loadGame() {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
  return null;
}
