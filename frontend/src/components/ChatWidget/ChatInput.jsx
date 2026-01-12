import { useState } from "react";

export default function ChatInput({ sendMessage, loading }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <div className="chat-input">
      <input
        placeholder="Ask about your pet..."
        value={text}
        disabled={loading}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>➤</button>
    </div>
  );
}
