// Terminal state types — governs the entire terminal UI state machine

export type OutputLineType =
  | "command"
  | "output"
  | "error"
  | "rick"
  | "ascii"
  | "system"
  | "blank"
  | "portal"; // New: portal open/close animation lines

export type OutputColor =
  | "green"
  | "yellow"
  | "red"
  | "cyan"
  | "white"
  | "dim"
  | "muted"
  | "amber";

export interface OutputLine {
  id: string;
  type: OutputLineType;
  content: string;
  color?: OutputColor;
  isHtml?: boolean;
}

export type CommandResult =
  | { type: "static"; lines: OutputLine[] }
  | { type: "stream"; prompt: string }
  | { type: "clear" }
  | { type: "clear-history" }
  | { type: "error"; message: string }
  | { type: "mode-change"; rickMode: boolean; lines: OutputLine[] };

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export interface TerminalState {
  history: OutputLine[];
  commandHistory: string[];
  historyIndex: number;
  currentInput: string;
  isStreaming: boolean;
  streamBuffer: string;
  isBooting: boolean;
  conversationHistory: ConversationMessage[];
  rickMode: boolean;
}
