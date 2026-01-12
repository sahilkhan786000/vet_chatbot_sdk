import { useEffect, useRef, useState } from "react";

export function useChat() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I’m your veterinary assistant 🐾" }
  ]);
  const [loading, setLoading] = useState(false);

  // Persist sessionId across renders
  const sessionIdRef = useRef(null);

  useEffect(() => {
    // Generate sessionId once
    if (!sessionIdRef.current) {
      sessionIdRef.current = `session_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}`;
    }
  }, []);

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          message: text,
          context: window.VetChatbotConfig || {}
        })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            "Sorry, I’m having trouble right now. Please try again later."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
}
