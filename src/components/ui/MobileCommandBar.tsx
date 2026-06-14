interface MobileCommandBarProps {
  onCommandTap: (command: string) => void;
  disabled: boolean;
  rickMode?: boolean;
}

export function MobileCommandBar({ onCommandTap, disabled, rickMode = false }: MobileCommandBarProps) {
  const normalCommands = ["help", "about", "projects", "skills", "contact", "open portal"];
  const rickCommands = ["help", "about", "projects", "skills", "close portal"];

  const commands = rickMode ? rickCommands : normalCommands;

  return (
    <div className="w-full overflow-x-auto scrollbar-hide px-4 mb-2">
      <div className="flex gap-2 w-max pb-2">
        {commands.map((cmd) => {
          const isPortal = cmd === "open portal" || cmd === "close portal";

          return (
            <button
              key={cmd}
              disabled={disabled}
              onClick={() => onCommandTap(cmd)}
              className={`
                bg-bg-chrome border rounded text-text-secondary font-code-sm text-code-sm px-3 py-1 
                hover:bg-bg-hover hover:text-text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary-container
                ${isPortal ? "border-primary-container text-primary-container font-bold" : "border-border-subtle"}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {isPortal ? (
                <span className="flex items-center gap-1">
                  🌀 {cmd}
                </span>
              ) : (
                cmd
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
