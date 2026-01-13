import MessageBubble from "../MessageBubble/MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({ messages, loading }) {
  if (!messages.length) {
    return (
      <div className="empty-chat">
        Start chatting with the vet assistant 🐶
      </div>
    );
  }

  return (
    <div className="chat-messages">
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}
      {loading && <TypingIndicator />}
    </div>
  );
}
