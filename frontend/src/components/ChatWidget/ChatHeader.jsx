export default function ChatHeader({ onClose }) {
  return (
    <div className="chat-header">
      <div>
        <strong>Vet Assistant 🐶</strong>
        <p>Pet care & appointments</p>
      </div>
      <button onClick={onClose}>✕</button>
    </div>
  );
}
