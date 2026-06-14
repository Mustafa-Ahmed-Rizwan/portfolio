export function AsciiHeader() {
  return (
    <>
      {/* Desktop Header */}
      <div className="hidden sm:block">
        <pre className="text-text-muted leading-tight whitespace-pre font-body-md select-none">
{`██████╗ ██╗ ██████╗██╗  ██╗    ███████╗██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██║██╔════╝██║ ██╔╝    ██╔════╝██╔══██╗██║     ██║██╔═══██╗
██████╔╝██║██║     █████╔╝     █████╗  ██║  ██║██║     ██║██║   ██║
██╔══██╗██║██║     ██╔═██╗     ██╔══╝  ██║  ██║██║     ██║██║   ██║
██║  ██║██║╚██████╗██║  ██╗    ██║     ██████╔╝███████╗██║╚██████╔╝
╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝    ╚═╝     ╚═════╝ ╚══════╝╚═╝ ╚═════╝`}
        </pre>
        <div className="text-text-secondary font-body-md flex flex-col gap-1 mt-4">
          <p>Mustafa&apos;s Portfolio v1.0 — Powered by Interdimensional Intelligence</p>
          <p>Type &apos;help&apos; for commands, or &apos;open portal&apos; if you dare. 🌀</p>
        </div>
      </div>

      {/* Mobile Header */}
      <header className="sm:hidden mb-8">
        <pre className="font-headline-md text-headline-md text-outline-variant leading-none tracking-tighter opacity-80 select-none">
{`██████╗ ██╗ ██████╗██╗  ██╗
██╔══██╗██║██╔════╝██║ ██╔╝
██████╔╝██║██║     █████╔╝ 
██╔══██╗██║██║     ██╔═██╗ 
██║  ██║██║╚██████╗██║  ██╗
╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝
███████╗██████╗ ██╗     ██╗ ██████╗ 
██╔════╝██╔══██╗██║     ██║██╔═══██╗
█████╗  ██████╔╝██║     ██║██║   ██║
██╔══╝  ██╔═══╝ ██║     ██║██║   ██║
██║     ██║     ███████╗██║╚██████╔╝
╚═╝     ╚═╝     ╚══════╝╚═╝ ╚═════╝`}
        </pre>
        <p className="font-label-md text-label-md text-text-secondary mt-4">Software Engineer | AI/ML Enthusiast</p>
        <p className="font-label-md text-label-md text-text-secondary">Type &apos;help&apos; or &apos;open portal&apos; 🌀</p>
      </header>
    </>
  );
}
