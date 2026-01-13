export default function SessionsPanel({
  sessions,
  activeSessionId,
  onSelect,
  onClose
}) {
  const formatTime = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="sessions-overlay">
      <div className="sessions-panel">
        <button
          className="sessions-close-btn"
          title="Close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="sessions-header">
          <strong>Chats</strong>
        </div>

        <div className="sessions-list">
          {sessions.map((s) => (
            <div
              key={s.sessionId}
              className={`session-card ${
                s.sessionId === activeSessionId ? "active" : ""
              }`}
              onClick={() => onSelect(s.sessionId)}
            >
              <div className="session-card-title">
                {s.title}
              </div>

              <div className="session-card-meta">
                <span>{s.messages.length} messages</span>
                <span>{formatTime(s.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
