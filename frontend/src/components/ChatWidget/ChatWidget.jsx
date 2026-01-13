import { useState } from "react";
import { useChat } from "../../hooks/useChat";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import SessionsPanel from "./SessionsPanel";
import "./chatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  const chat = useChat();

  return (
    <>
      {!open && (
        <button
          className="chat-fab"
          onClick={() => {
            setOpen(true);
            if (!chat.activeSession) {
              chat.startNewSession();
            }
          }}
        >
          🤍
        </button>
      )}

      <div
        className="chat-container"
        style={{ display: open ? "flex" : "none" }}
      >
        <ChatHeader
          onClose={() => setOpen(false)}
          onSessionsClick={() => setShowSessions(true)}
        />

        <ChatMessages
          messages={chat.activeSession?.messages || []}
          loading={chat.loading}
        />

        <ChatInput
          sendMessage={chat.sendMessage}
          loading={chat.loading}
          disabled={!chat.activeSession}
          onNewChat={chat.startNewSession}   
        />

        {showSessions && (
          <SessionsPanel
            sessions={chat.sessions}
            activeSessionId={chat.activeSessionId}
            onSelect={(id) => {
              chat.setActiveSessionId(id);
              setShowSessions(false);
            }}
            onClose={() => setShowSessions(false)}
          />
        )}
      </div>
    </>
  );
}
