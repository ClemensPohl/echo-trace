export const handleCommand = (input: string, log: string[]): string[] => {
  const command = input.trim().toLowerCase();
  const newLog = [...log, `> ${command}`];

  switch (command) {
    case "help":
      return [...newLog, "Available commands:", "- investigate", "- analyze [item]", "- solve [riddle]", "- examine [location]", "- help", "- inventory"];
    case "investigate":
      return [...newLog, "You approach the neon-lit alley where the body was found..."];
    case "inventory":
      return [...newLog, "Inventory: flashlight, encrypted notebook, neural lens"];
    default:
      return [...newLog, `Unknown command. Type 'help' to see valid commands.`];
  }
};
