import { staticCommands, getPortalOpenLines, getPortalCloseLines } from "./static-commands";
import { CommandResult } from "@/types/terminal";

export function dispatchCommand(input: string, rickMode: boolean): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { type: "static", lines: [] };
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  const fullLower = trimmed.toLowerCase();

  // ── Portal commands (work in BOTH modes) ──
  if (fullLower === "open portal") {
    if (rickMode) {
      // Already in Rick mode
      return {
        type: "static",
        lines: [
          {
            id: Math.random().toString(36).substring(2, 9),
            type: "rick",
            content: "The portal's already open, genius. I'm right here. What do you want?",
            color: "green",
          },
        ],
      };
    }
    return {
      type: "mode-change",
      rickMode: true,
      lines: getPortalOpenLines(),
    };
  }

  if (fullLower === "close portal") {
    if (!rickMode) {
      return {
        type: "static",
        lines: [
          {
            id: Math.random().toString(36).substring(2, 9),
            type: "output",
            content: "No portal is open. Type 'open portal' to summon Rick.",
            color: "dim",
          },
        ],
      };
    }
    return {
      type: "mode-change",
      rickMode: false,
      lines: getPortalCloseLines(),
    };
  }

  // ── Clear commands (work in BOTH modes) ──
  if (cmd === "clear") {
    if (args[0] === "--history") {
      return { type: "clear-history" };
    }
    return { type: "clear" };
  }

  // ── Static commands (work in BOTH modes) ──
  if (staticCommands[cmd]) {
    return staticCommands[cmd](args, rickMode);
  }

  // ── Rick shortcut: "rick <question>" works in BOTH modes ──
  if (cmd === "rick" || cmd === "ask") {
    if (args.length === 0) {
      // Just typed "rick" with no question — open portal if not in rick mode
      if (!rickMode) {
        return {
          type: "mode-change",
          rickMode: true,
          lines: getPortalOpenLines(),
        };
      }
      return {
        type: "static",
        lines: [
          {
            id: Math.random().toString(36).substring(2, 9),
            type: "rick",
            content: "Yeah? What? You opened your mouth and nothing came out. Try again.",
            color: "green",
          },
        ],
      };
    }
    return {
      type: "stream",
      prompt: trimmed,
    };
  }

  // ── Mode-dependent behavior for unknown commands ──
  if (rickMode) {
    // In Rick mode: everything goes to Rick as a conversational prompt
    return {
      type: "stream",
      prompt: trimmed,
    };
  }

  // In normal mode: command not found
  return {
    type: "static",
    lines: [
      {
        id: Math.random().toString(36).substring(2, 9),
        type: "error",
        content: `Command not found: ${cmd}`,
        color: "red",
      },
      {
        id: Math.random().toString(36).substring(2, 9),
        type: "output",
        content: "Type 'help' for available commands, or 'open portal' to summon Rick.",
        color: "dim",
      },
    ],
  };
}
