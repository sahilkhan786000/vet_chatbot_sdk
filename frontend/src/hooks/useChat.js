import { useEffect, useState } from "react";

export function useChat() {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ----------------------------------
     LOAD SESSIONS ON APP START
  ---------------------------------- */
  useEffect(() => {
    async function loadSessions() {
      try {
        const res = await fetch("http://localhost:5000/api/conversations");
        const data = await res.json();

        // Normalize backend response for UI
        const normalized = data.map((c) => ({
          sessionId: c.sessionId,
          createdAt: c.createdAt,
          title:
            c.messages?.[0]?.text?.slice(0, 50) || "New Chat",
          messages: [] // messages loaded lazily
        }));

        setSessions(normalized);

        // Auto-select latest session
        if (normalized.length && !activeSessionId) {
          setActiveSessionId(normalized[0].sessionId);
        }
      } catch (err) {
        console.error("Failed to load sessions", err);
      }
    }

    loadSessions();
  }, []);

  /* ----------------------------------
     LOAD MESSAGES WHEN SESSION CHANGES
  ---------------------------------- */
  useEffect(() => {
    if (!activeSessionId) return;

    async function loadMessages() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/conversations/${activeSessionId}`
        );
        const messages = await res.json();

        setSessions((prev) =>
          prev.map((s) =>
            s.sessionId === activeSessionId
              ? { ...s, messages }
              : s
          )
        );
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    }

    loadMessages();
  }, [activeSessionId]);

  /* ----------------------------------
     DERIVED ACTIVE SESSION
  ---------------------------------- */
  const activeSession = sessions.find(
    (s) => s.sessionId === activeSessionId
  );

  /* ----------------------------------
     CREATE NEW SESSION (FRONTEND-ONLY)
     Backend will create it lazily on first message
  ---------------------------------- */
  const startNewSession = () => {
    const sessionId = `session_${Date.now()}`;
    const now = new Date();

    const newSession = {
      sessionId,
      createdAt: now.toISOString(),
      title: "New Chat",
      messages: [
        { role: "bot", text: "Hi! I’m your veterinary assistant 🤍" }
      ]
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(sessionId);
  };

  /* ----------------------------------
     SEND MESSAGE
  ---------------------------------- */
  const sendMessage = async (text) => {
    if (!activeSessionId) return;

    setLoading(true);

    // Optimistic UI: user message
    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === activeSessionId
          ? {
              ...s,
              title:
                s.title === "New Chat"
                  ? text.slice(0, 50)
                  : s.title,
              messages: [...s.messages, { role: "user", text }]
            }
          : s
      )
    );

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: activeSessionId,
          message: text,
          context: window.VetChatbotConfig || {}
        })
      });

      const data = await res.json();

      // Append bot reply
      setSessions((prev) =>
        prev.map((s) =>
          s.sessionId === activeSessionId
            ? {
                ...s,
                messages: [
                  ...s.messages,
                  { role: "bot", text: data.reply }
                ]
              }
            : s
        )
      );
    } catch (err) {
      setSessions((prev) =>
        prev.map((s) =>
          s.sessionId === activeSessionId
            ? {
                ...s,
                messages: [
                  ...s.messages,
                  {
                    role: "bot",
                    text:
                      "Sorry, something went wrong. Please try again later."
                  }
                ]
              }
            : s
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    startNewSession,
    sendMessage,
    loading
  };
}
