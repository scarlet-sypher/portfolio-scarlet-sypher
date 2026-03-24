import { useState, useRef, useEffect } from "react";

const INITIAL_CONSOLE_LINES = [
  { type: "system", text: "macOS Terminal — zsh" },
  { type: "system", text: 'Type "help" for available commands.' },
  { type: "prompt", text: "" },
];

const TERMINAL_COMMANDS = {
  help: () => ["Available commands: help, ls, pwd, whoami, date, clear, echo <text>"],
  ls: () => ["Applications   Desktop   Documents   Downloads   Music   Pictures"],
  pwd: () => ["/Users/ayush"],
  whoami: () => ["ayush"],
  date: () => [new Date().toString()],
  clear: () => null,
};

export default function Terminal() {
  const [consoleLines, setConsoleLines] = useState(INITIAL_CONSOLE_LINES);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLines]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const command = currentInput.trim();
      if (!command) return;

      const updatedHistory = [command, ...commandHistory];
      setCommandHistory(updatedHistory);
      setHistoryIndex(-1);

      const updatedLines = [
        ...consoleLines.slice(0, -1),
        { type: "input", text: `$ ${command}` },
      ];

      if (command === "clear") {
        setConsoleLines([{ type: "prompt", text: "" }]);
        setCurrentInput("");
        return;
      }

      const [baseCommand, ...args] = command.split(" ");
      const commandAction = TERMINAL_COMMANDS[baseCommand];
      let outputLines;
      
      if (commandAction) {
        outputLines = commandAction(args.join(" "));
      } else if (baseCommand === "echo") {
        outputLines = [args.join(" ")];
      } else {
        outputLines = [`zsh: command not found: ${baseCommand}`];
      }

      if (outputLines) {
        updatedLines.push(...outputLines.map((text) => ({ type: "output", text })));
      }
      
      updatedLines.push({ type: "prompt", text: "" });
      setConsoleLines(updatedLines);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      setCurrentInput(commandHistory[nextIndex] ?? "");
    } else if (e.key === "ArrowDown") {
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setCurrentInput(nextIndex === -1 ? "" : commandHistory[nextIndex]);
    }
  };

  return (
    <div
      className="h-full flex flex-col p-4 font-mono overflow-auto"
      style={{ background: "rgba(0, 0, 0, 0.5)", cursor: "text" }}
      onClick={() => inputRef.current?.focus()}
    >
      {consoleLines.map((line, index) => (
        <div key={index} className="flex items-start leading-5">
          {line.type === "system" && (
            <span className="text-xs text-white/30">
              {line.text}
            </span>
          )}
          {line.type === "input" && (
            <span className="text-xs" style={{ color: "rgba(100, 220, 100, 0.9)" }}>
              {line.text}
            </span>
          )}
          {line.type === "output" && (
            <span className="text-xs whitespace-pre-wrap text-white/65">
              {line.text}
            </span>
          )}
          {line.type === "prompt" && index === consoleLines.length - 1 && (
            <div className="flex items-center text-xs" style={{ color: "rgba(100, 220, 100, 0.9)" }}>
              <span>ayush@mac ~ $&nbsp;</span>
              <input
                ref={inputRef}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-transparent outline-none flex-1 caret-green-400 text-white/85 min-w-[1px]"
                autoFocus
              />
            </div>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
