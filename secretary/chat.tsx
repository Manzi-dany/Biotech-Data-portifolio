"use client";

import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { from: "Visitor", text: input }]);
    setInput("");
    // Placeholder: Here you could add AI response logic
  };

  return (
    <div className="border p-4 rounded-md space-y-2">
      <h3 className="font-semibold">Chat with Secretary</h3>
      <div className="h-32 overflow-y-auto border p-2 rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx}><strong>{msg.from}:</strong> {msg.text}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-1 flex-1 rounded"
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-2 rounded" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
