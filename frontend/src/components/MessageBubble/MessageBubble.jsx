import "./messageBubble.css";

export default function MessageBubble({ message }) {
  return (
    <div className={`bubble ${message.role}`}>
      {message.text}
    </div>
  );
}
