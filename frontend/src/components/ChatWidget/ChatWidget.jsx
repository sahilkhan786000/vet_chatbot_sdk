import { useState } from "react";
import { useChat } from "../../hooks/useChat";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "./chatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  // ✅ SINGLE SOURCE OF TRUTH
  const chat = useChat();

  return (
    <>
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)}>
          🐾
        </button>
      )}

      {open && (
        <div className="chat-container">
          <ChatHeader onClose={() => setOpen(false)} />
          <ChatMessages messages={chat.messages} loading={chat.loading} />
          <ChatInput sendMessage={chat.sendMessage} loading={chat.loading} />
        </div>
      )}
    </>
  );
}
