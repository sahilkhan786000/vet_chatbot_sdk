import MessageBubble from "../MessageBubble/MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({ messages, loading }) {
  return (
    <div className="chat-messages">
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}
      {loading && <TypingIndicator />}
    </div>
  );
}
