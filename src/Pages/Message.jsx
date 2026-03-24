import { useState } from "react";

const CONTACTS_LIST = [
  { name: "Naruto", lastText: "Believe it! 🍥", timestamp: "9:41", unreadCount: 2 },
  { name: "Kakashi", lastText: "Training at 6am", timestamp: "8:30", unreadCount: 0 },
  { name: "Gojo", lastText: "Infinity activated", timestamp: "Yesterday", unreadCount: 1 },
  { name: "Makima", lastText: "Control is everything", timestamp: "Mon", unreadCount: 0 },
];

const MESSAGE_HISTORY = {
  Naruto: [
    { sender: "them", text: "Hey! Are you free today?" },
    { sender: "me", text: "Yeah what's up?" },
    { sender: "them", text: "Believe it! 🍥" },
    { sender: "them", text: "Training session?" },
  ],
  Kakashi: [
    { sender: "them", text: "Don't be late." },
    { sender: "me", text: "I'll try 😅" },
    { sender: "them", text: "Training at 6am" },
  ],
  Gojo: [
    { sender: "them", text: "You can't beat me." },
    { sender: "me", text: "Wanna bet?" },
    { sender: "them", text: "Infinity activated" },
  ],
  Makima: [
    { sender: "them", text: "Follow the rules." },
    { sender: "me", text: "Always." },
    { sender: "them", text: "Control is everything" },
  ],
};

export default function Message() {
  const [activeContact, setActiveContact] = useState("Naruto");
  const [draftMessage, setDraftMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(MESSAGE_HISTORY);

  const handleSendMessage = () => {
    if (!draftMessage.trim()) return;
    
    setChatHistory((prev) => ({
      ...prev,
      [activeContact]: [...(prev[activeContact] || []), { sender: "me", text: draftMessage }],
    }));
    
    setDraftMessage("");
  };

  return (
    <div className="h-full flex" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
      <div
        className="w-52 flex flex-col shrink-0"
        style={{
          borderRight: "1px solid rgba(255, 255, 255, 0.07)",
          background: "rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          className="px-4 py-3 text-[11px] font-semibold tracking-widest"
          style={{
            fontFamily: "'Courier New', monospace",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          MESSAGES
        </div>
        
        {CONTACTS_LIST.map((contact) => (
          <button
            key={contact.name}
            onClick={() => setActiveContact(contact.name)}
            className="flex items-start gap-3 px-4 py-3 text-left transition-all"
            style={{
              background: activeContact === contact.name ? "rgba(255, 255, 255, 0.07)" : "transparent",
            }}
          >
            <div
              className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-bold"
              style={{
                background: "rgba(255, 145, 40, 0.3)",
                color: "rgba(255, 165, 60, 0.9)",
              }}
            >
              {contact.name[0]}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold">{contact.name}</span>
                <span className="text-[9px] text-white/30">{contact.timestamp}</span>
              </div>
              <div className="text-[10px] truncate mt-0.5 text-white/35">
                {contact.lastText}
              </div>
            </div>
            
            {contact.unreadCount > 0 && (
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-1"
                style={{ background: "rgba(255, 145, 40, 0.85)", color: "#fff" }}
              >
                {contact.unreadCount}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <div
          className="px-4 py-3 shrink-0 flex items-center gap-3"
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.07)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              background: "rgba(255, 145, 40, 0.3)",
              color: "rgba(255, 165, 60, 0.9)",
            }}
          >
            {activeContact[0]}
          </div>
          <span className="text-xs font-semibold">{activeContact}</span>
        </div>

        <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-2">
          {(chatHistory[activeContact] || []).map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-xs px-3 py-2 rounded-2xl text-xs"
                style={{
                  background: message.sender === "me" ? "rgba(255, 145, 40, 0.7)" : "rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.9)",
                  borderRadius: message.sender === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pb-4 pt-2 flex gap-2 shrink-0">
          <input
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="iMessage"
            className="flex-1 px-4 py-2 rounded-full text-xs outline-none placeholder:text-white/20"
            style={{
              background: "rgba(255, 255, 255, 0.07)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          />
          <button
            onClick={handleSendMessage}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: "rgba(255, 145, 40, 0.8)", color: "#fff" }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
