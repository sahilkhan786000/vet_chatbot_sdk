import { useState } from "react";

export default function ChatInput({
  sendMessage,
  loading,
  disabled,
  onNewChat
}) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    sendMessage(text);
    setText("");
  };

  return (
    <div className="chat-input">
      <input
        placeholder={
          disabled
            ? "Start a new chat to begin..."
            : "Ask about your pet..."
        }
        value={text}
        disabled={loading || disabled}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />


      <button
        className="chat-btn"
        title="Send"
        onClick={handleSend}
        disabled={loading || disabled}
      >
        ➤
      </button>

  
      <button
        className="chat-btn"
        title="New chat"
        onClick={onNewChat}
        disabled={loading}
      >
        🆕
      </button>

     
    </div>
  );
}
