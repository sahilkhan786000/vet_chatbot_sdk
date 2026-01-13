export default function ChatHeader({ onClose, onSessionsClick }) {
  return (
    <div className="chat-header">
      <div className="header-left">
        <div className="pet-icon">🐶🐱</div>
        <div>
          <strong>Vet Assistant</strong>
          <p>Caring for your pets</p>
        </div>
      </div>

      <div className="header-actions">
        {/* Hamburger (sessions) */}
        <button
          className="header-icon-btn"
          title="Chat sessions"
          onClick={onSessionsClick}
        >
          ☰
        </button>

        {/* Small close */}
        <button
          className="header-icon-btn"
          title="Close chat"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
