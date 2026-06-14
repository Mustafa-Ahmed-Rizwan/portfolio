import { useEffect, useRef } from "react";
import { OutputLine } from "@/types/terminal";
import { TerminalLine } from "./TerminalLine";
import { StreamingText } from "./StreamingText";
import { AsciiHeader } from "./AsciiHeader";

interface TerminalOutputProps {
  history: OutputLine[];
  isStreaming: boolean;
  streamBuffer: string;
  rickMode?: boolean;
}

export function TerminalOutput({ history, isStreaming, streamBuffer, rickMode = false }: TerminalOutputProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever history changes or stream updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [history, streamBuffer]);

  return (
    <div className="flex flex-col w-full">
      <AsciiHeader />

      {history.map((line) => (
        <TerminalLine key={line.id} line={line} rickMode={rickMode} />
      ))}

      {isStreaming && <StreamingText content={streamBuffer} />}

      <div ref={bottomRef} className="h-4 sm:h-1" />
    </div>
  );
}
