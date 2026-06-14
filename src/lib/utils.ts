import { OutputLine, OutputColor } from "../types/terminal";

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function createLine(
  content: string,
  type: OutputLine["type"] = "output",
  color?: OutputColor,
  isHtml: boolean = false
): OutputLine {
  return {
    id: generateId(),
    type,
    content,
    color,
    isHtml,
  };
}

export function parseCommand(input: string): { command: string; args: string[] } {
  const trimmed = input.trim();
  if (!trimmed) return { command: "", args: [] };
  
  const parts = trimmed.split(/\s+/);
  return {
    command: parts[0].toLowerCase(),
    args: parts.slice(1),
  };
}
