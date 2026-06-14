import { CommandResult, OutputLine } from "@/types/terminal";
import { portfolioData } from "@/lib/portfolio-data";
import { createLine } from "@/lib/utils";

// ── Portal open/close display lines ──

export function getPortalOpenLines(): OutputLine[] {
  return [
    createLine("", "blank"),
    createLine("  ╔══════════════════════════════════════════╗", "portal", "green"),
    createLine("  ║     🌀  INTERDIMENSIONAL PORTAL OPEN     ║", "portal", "green"),
    createLine("  ║                                          ║", "portal", "green"),
    createLine("  ║  Rick Sanchez has entered the terminal.  ║", "portal", "green"),
    createLine("  ║  Dimension: C-137                        ║", "portal", "green"),
    createLine("  ║  Status: Mildly annoyed                  ║", "portal", "green"),
    createLine("  ╚══════════════════════════════════════════╝", "portal", "green"),
    createLine("", "blank"),
    createLine("*burp* Alright, I'm here. What do you want?", "rick", "green"),
    createLine("Type anything to talk to Rick. 'close portal' when you're done.", "output", "dim"),
    createLine("", "blank"),
  ];
}

export function getPortalCloseLines(): OutputLine[] {
  return [
    createLine("", "blank"),
    createLine("  ╔══════════════════════════════════════════╗", "portal", "green"),
    createLine("  ║     🌀  PORTAL CLOSING...                ║", "portal", "green"),
    createLine("  ║                                          ║", "portal", "green"),
    createLine("  ║  Rick has left the terminal.             ║", "portal", "green"),
    createLine("  ║  \"Don't call me unless it's important.\"  ║", "portal", "green"),
    createLine("  ╚══════════════════════════════════════════╝", "portal", "green"),
    createLine("", "blank"),
    createLine("Terminal mode restored. Type 'help' for commands.", "output", "dim"),
    createLine("", "blank"),
  ];
}

// ── Static command definitions ──

export const staticCommands: Record<string, (args: string[], rickMode?: boolean) => CommandResult> = {
  help: (_args, rickMode = false) => ({
    type: "static",
    lines: rickMode
      ? [
          createLine("RICK MODE COMMANDS:", "output", "muted"),
          createLine("  Just type anything — Rick will respond.", "output", "green"),
          createLine("", "blank"),
          createLine("  close portal  - Send Rick back through the portal", "output", "amber"),
          createLine("  help          - You're looking at it", "output", "amber"),
          createLine("  about         - Quick bio", "output", "amber"),
          createLine("  skills        - Tech stack list", "output", "amber"),
          createLine("  projects      - Project list", "output", "amber"),
          createLine("  contact       - Reach out", "output", "amber"),
          createLine("  clear         - Wipe the terminal", "output", "amber"),
        ]
      : [
          createLine("AVAILABLE COMMANDS:", "output", "muted"),
          createLine("  help          - Shows this menu", "output", "amber"),
          createLine("  about         - Who is Mustafa?", "output", "amber"),
          createLine("  skills        - Technical skills", "output", "amber"),
          createLine("  projects      - Things Mustafa built", "output", "amber"),
          createLine("  contact       - Get in touch", "output", "amber"),
          createLine("  clear         - Wipe the terminal", "output", "amber"),
          createLine(""),
          createLine("  open portal   - 🌀 Summon Rick Sanchez [AI Chat]", "output", "green"),
          createLine(""),
          createLine("TIP: Use 'rick <question>' for a quick question without opening the portal.", "output", "dim"),
        ],
  }),

  about: () => {
    const p = portfolioData.personal;
    return {
      type: "static",
      lines: [
        createLine("WHOAMI ──────────────────────────────────────────────", "output", "muted"),
        createLine(`Name:     ${p.name}`, "output", "cyan"),
        createLine(`Title:    ${p.title}`, "output", "white"),
        createLine(`Location: ${p.location}`, "output", "white"),
        createLine(`Status:   ${p.status}`, "output", "amber"),
        createLine(""),
        createLine("Summary:", "output", "muted"),
        createLine("A software engineer who spends too much time staring at dark mode themes.", "output", "white"),
      ],
    };
  },

  skills: () => {
    const lines = [createLine("SKILLS ──────────────────────────────────────────────", "output", "muted")];

    portfolioData.skills.forEach((category) => {
      lines.push(createLine(category.name.padEnd(16) + category.items.join("  "), "output", "white"));
    });

    return {
      type: "static",
      lines,
    };
  },

  projects: () => {
    const lines = [createLine("PROJECTS ────────────────────────────────────────────", "output", "muted")];

    portfolioData.projects.forEach((p) => {
      lines.push(createLine(`${p.name} [${p.category}]`, "output", "cyan"));
      lines.push(createLine(`  ${p.tagline}`, "output", "white"));
      lines.push(createLine(`  Tech: ${p.tech.join(", ")}`, "output", "dim"));
      lines.push(createLine(""));
    });

    lines.push(createLine("Use 'open portal' then ask Rick about any project for his take.", "output", "amber"));

    return {
      type: "static",
      lines,
    };
  },

  contact: () => {
    const p = portfolioData.personal;
    // We use isHtml: true to render real links, but we have to be careful with security if this was dynamic user input.
    // Since it's static config data, it's safe.
    return {
      type: "static",
      lines: [
        createLine("CONTACT INFO ────────────────────────────────────────", "output", "muted"),
        createLine(
          `Email:    <a href="mailto:${p.email}" class="text-highlight underline hover:text-white" target="_blank">${p.email}</a>`,
          "output",
          "white",
          true
        ),
        createLine(
          `GitHub:   <a href="${p.githubUrl}" class="text-highlight underline hover:text-white" target="_blank">${p.github}</a>`,
          "output",
          "white",
          true
        ),
        createLine(
          `LinkedIn: <a href="${p.linkedinUrl}" class="text-highlight underline hover:text-white" target="_blank">${p.linkedin}</a>`,
          "output",
          "white",
          true
        ),
      ],
    };
  },

  // Easter eggs
  wubba: () => ({
    type: "static",
    lines: [createLine("Wubba lubba dub dub! (I am in great pain, please help me).", "rick", "green")],
  }),
  sudo: () => ({
    type: "static",
    lines: [createLine("Mustafa is not in the sudoers file. This incident will be reported to Rick.", "error", "red")],
  }),
};
