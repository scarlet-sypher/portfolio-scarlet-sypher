import { FILE_SYSTEM, SECTION_ALIASES, FASTFETCH_IMAGES } from "./FileSystem";

function resolvePath(cwd, target) {
  if (target === "/") return "/";
  if (target.startsWith("/")) return normalizePath(target);

  if (target === "..") {
    if (cwd === "/") return "/";
    const parts = cwd.split("/").filter(Boolean);
    parts.pop();
    return "/" + parts.join("/");
  }

  if (target === ".") return cwd;

  const base = cwd === "/" ? "" : cwd;
  return normalizePath(base + "/" + target);
}

function normalizePath(p) {
  const parts = p.split("/").filter(Boolean);
  return "/" + parts.join("/");
}

function getNode(path) {
  if (path === "/") return FILE_SYSTEM["/"];
  return FILE_SYSTEM[path] || null;
}

export function handleCommand(rawInput, cwd, setCwd) {
  const input = rawInput.trim();
  if (!input) return { lines: [], newCwd: cwd };

  const parts = input.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case "help":
      return cmdHelp();
    case "pwd":
      return cmdPwd(cwd);
    case "ls":
      return cmdLs(cwd, args[0]);
    case "cd":
      return cmdCd(cwd, args[0]);
    case "clear":
      return { lines: null, newCwd: cwd, clear: true };
    case "fastfetch":
      return cmdFastfetch();
    case "cat":
      return cmdCat(cwd, args[0]);
    case "echo":
      return { lines: [{ type: "output", text: args.join(" ") }], newCwd: cwd };
    case "whoami":
      return {
        lines: [{ type: "output", text: "scarlet-sypher" }],
        newCwd: cwd,
      };
    case "date":
      return {
        lines: [{ type: "output", text: new Date().toString() }],
        newCwd: cwd,
      };
    case "uname":
      return {
        lines: [
          {
            type: "output",
            text: "Linux scarlet-sypher 6.18.9-arch1-2 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
          },
        ],
        newCwd: cwd,
      };
    default:
      return cmdSectionAlias(cmd, cwd) || cmdNotFound(cmd);
  }
}

function cmdHelp() {
  return {
    newCwd: undefined,
    lines: [
      { type: "section", text: "available commands" },
      { type: "cmd-row", cmd: "help", desc: "show this help menu" },
      { type: "cmd-row", cmd: "pwd", desc: "print current directory" },
      { type: "cmd-row", cmd: "ls [path]", desc: "list directory contents" },
      { type: "cmd-row", cmd: "cd <path>", desc: "change directory" },
      { type: "cmd-row", cmd: "cat <file>", desc: "read a file" },
      {
        type: "cmd-row",
        cmd: "fastfetch",
        desc: "display system info (neofetch style)",
      },
      { type: "cmd-row", cmd: "clear", desc: "clear the terminal" },
      { type: "cmd-row", cmd: "whoami", desc: "print current user" },
      { type: "cmd-row", cmd: "uname", desc: "print system info" },
      { type: "cmd-row", cmd: "echo <text>", desc: "print text to terminal" },
      { type: "blank" },
      { type: "section", text: "quick navigation" },
      { type: "cmd-row", cmd: "about", desc: "jump to about info" },
      { type: "cmd-row", cmd: "skills", desc: "jump to skills" },
      { type: "cmd-row", cmd: "projects", desc: "jump to projects" },
      {
        type: "cmd-row",
        cmd: "experience / work",
        desc: "jump to work experience",
      },
      { type: "cmd-row", cmd: "certificates", desc: "jump to certificates" },
      { type: "cmd-row", cmd: "education", desc: "jump to education" },
      { type: "cmd-row", cmd: "contact", desc: "jump to contact info" },
    ],
  };
}

function cmdPwd(cwd) {
  const display = cwd === "/" ? "~" : "~" + cwd;
  return {
    newCwd: undefined,
    lines: [{ type: "output", text: display }],
  };
}

function cmdLs(cwd, targetArg) {
  const targetPath = targetArg ? resolvePath(cwd, targetArg) : cwd;
  const node = getNode(targetPath);

  if (!node) {
    return {
      newCwd: undefined,
      lines: [
        {
          type: "error",
          text: `ls: cannot access '${targetArg}': No such file or directory`,
        },
      ],
    };
  }

  if (node.type === "file") {
    const name = targetPath.split("/").pop();
    return {
      newCwd: undefined,
      lines: [{ type: "file-entry", text: name, isFile: true }],
    };
  }

  if (!node.children || node.children.length === 0) {
    return { newCwd: undefined, lines: [{ type: "output", text: "(empty)" }] };
  }

  const lines = node.children.map((child) => {
    const childPath =
      targetPath === "/" ? "/" + child : targetPath + "/" + child;
    const childNode = getNode(childPath);
    const isDir = childNode?.type === "dir";
    return { type: "ls-entry", text: child, isDir };
  });

  return { newCwd: undefined, lines };
}

function cmdCd(cwd, target) {
  if (!target || target === "~") {
    return { newCwd: "/", lines: [] };
  }

  if (SECTION_ALIASES[target.toLowerCase()]) {
    const aliasPath = SECTION_ALIASES[target.toLowerCase()];
    const node = getNode(aliasPath);
    if (node?.type === "dir") {
      return { newCwd: aliasPath, lines: [] };
    }
  }

  const targetPath = resolvePath(cwd, target);
  const node = getNode(targetPath);

  if (!node) {
    return {
      newCwd: undefined,
      lines: [
        { type: "error", text: `cd: no such file or directory: ${target}` },
      ],
    };
  }

  if (node.type === "file") {
    return {
      newCwd: undefined,
      lines: [{ type: "error", text: `cd: not a directory: ${target}` }],
    };
  }

  return { newCwd: targetPath, lines: [] };
}

function cmdCat(cwd, target) {
  if (!target) {
    return {
      newCwd: undefined,
      lines: [{ type: "error", text: "cat: missing file operand" }],
    };
  }

  const targetPath = resolvePath(cwd, target);
  const node = getNode(targetPath);

  if (!node) {
    return {
      newCwd: undefined,
      lines: [
        { type: "error", text: `cat: ${target}: No such file or directory` },
      ],
    };
  }

  if (node.type === "dir") {
    return {
      newCwd: undefined,
      lines: [{ type: "error", text: `cat: ${target}: Is a directory` }],
    };
  }

  return {
    newCwd: undefined,
    lines: node.content.map((line) => ({ type: "output", text: line })),
  };
}

function cmdFastfetch() {
  const img =
    FASTFETCH_IMAGES[Math.floor(Math.random() * FASTFETCH_IMAGES.length)];
  return {
    newCwd: undefined,
    lines: [{ type: "fastfetch", img }],
  };
}

function cmdSectionAlias(cmd, cwd) {
  const alias = SECTION_ALIASES[cmd];
  if (!alias) return null;

  const node = getNode(alias);
  if (!node) return null;

  if (node.type === "dir") {
    const lsResult = cmdLs(alias);
    return {
      newCwd: alias,
      lines: [{ type: "section", text: cmd }, ...lsResult.lines],
    };
  }

  return {
    newCwd: undefined,
    lines: [
      { type: "section", text: cmd },
      ...node.content.map((line) => ({ type: "output", text: line })),
    ],
  };
}

function cmdNotFound(cmd) {
  return {
    newCwd: undefined,
    lines: [
      {
        type: "error",
        text: `${cmd}: command not found. Type 'help' to see available commands.`,
      },
    ],
  };
}
