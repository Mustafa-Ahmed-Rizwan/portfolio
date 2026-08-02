import { useState, useRef, useEffect } from "react";

interface TerminalInputProps {
  onSubmit: (command: string) => void;
  isStreaming: boolean;
  isDesktop?: boolean;
  rickMode?: boolean;
}

export function TerminalInput({ onSubmit, isStreaming, isDesktop = true, rickMode = false }: TerminalInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleGlobalClick = () => {
      if (window.getSelection()?.toString()) return;
      inputRef.current?.focus();
    };

    document.addEventListener("click", handleGlobalClick);
    inputRef.current?.focus();

    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStreaming) return;

    onSubmit(input);
    setInput("");
  };

  const promptPrefix = rickMode ? "rick@C-137:~$" : "mustafa@portfolio:~$";
  const promptColor = rickMode ? "text-primary-container" : "text-text-secondary";

  if (isDesktop) {
    return (
      <div className="flex items-center font-body-md text-body-md">
        <span className={`${promptColor} shrink-0`}>{promptPrefix}</span>
        <form onSubmit={handleSubmit} className="flex-1 relative flex items-center ml-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isStreaming}
            className="w-full bg-transparent border-none outline-none text-text-primary caret-transparent absolute inset-0 z-10 p-0 m-0"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
          <div className="pointer-events-none flex whitespace-pre" aria-hidden="true">
            <span className="text-transparent">{input}</span>
            {!isStreaming && (
              <span className="w-2 h-4 bg-primary-container inline-block ml-[1px] blink align-middle translate-y-[2px]"></span>
            )}
          </div>
        </form>
      </div>
    );
  }

  // Mobile layout
  return (
    <form onSubmit={handleSubmit} className="flex-1 relative flex items-center w-full">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isStreaming}
        placeholder={rickMode ? "Ask Rick anything..." : "Enter command..."}
        className="w-full bg-transparent border-none outline-none focus:ring-0 text-text-primary font-body-md text-body-md p-0 m-0 placeholder-text-muted"
        autoComplete="off"
        spellCheck="false"
      />
    </form>
  );
}
