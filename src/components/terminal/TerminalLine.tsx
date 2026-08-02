import { OutputLine } from "@/types/terminal";

interface TerminalLineProps {
  line: OutputLine;
  rickMode?: boolean;
}

export function TerminalLine({ line, rickMode = false }: TerminalLineProps) {
  const getColorClass = (color?: string) => {
    switch (color) {
      case "green": return "text-primary-container";
      case "cyan": return "text-secondary-container";
      case "amber": return "text-accent-amber";
      case "red": return "text-traffic-light-red";
      case "white": return "text-text-primary";
      case "dim": return "text-text-secondary opacity-70";
      case "muted": return "text-text-muted";
      default: return "text-text-primary";
    }
  };

  if (line.type === "command") {
    const promptPrefix = rickMode ? "rick@C-137:~$" : "mustafa@portfolio:~$";
    const promptColor = rickMode ? "text-primary-container" : "text-text-secondary";
    return (
      <div className="flex items-start gap-2 mb-1">
        <span className={`${promptColor} shrink-0`}>{promptPrefix}</span>
        <span className="text-text-primary break-all">{line.content}</span>
      </div>
    );
  }

  if (line.type === "rick") {
    return (
      <div className="pl-4 border-l-2 border-outline-variant my-2">
        <span className="text-primary-container font-bold">&gt; Rick: </span>
        <span className="text-primary-container whitespace-pre-wrap break-words">{line.content}</span>
      </div>
    );
  }

  if (line.type === "portal") {
    return (
      <div className={`mb-0 whitespace-pre font-code-sm text-code-sm ${getColorClass(line.color)}`}>
        {line.content}
      </div>
    );
  }

  if (line.type === "error") {
    return (
      <div className="flex items-start gap-2 mb-1">
        <span className="text-traffic-light-red font-bold shrink-0">[ERROR]</span>
        <span className="text-traffic-light-red whitespace-pre-wrap break-all">{line.content}</span>
      </div>
    );
  }

  // Default output line
  return (
    <div className={`mb-1 whitespace-pre-wrap font-code-sm text-code-sm ${getColorClass(line.color)}`}>
      {line.isHtml ? (
        <span dangerouslySetInnerHTML={{ __html: line.content }} />
      ) : (
        line.content
      )}
    </div>
  );
}
