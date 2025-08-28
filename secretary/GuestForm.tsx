"use client";

import { useState } from "react";

export default function GuestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: save message to DB or send email
    console.log({ name, email, message });
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="border p-4 rounded-md space-y-2">
      <h3 className="font-semibold">Leave a Message</h3>
      {submitted && <p className="text-green-500">Message sent!</p>}
      <form className="space-y-2" onSubmit={handleSubmit}>
        <input
          className="border p-1 w-full rounded"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-1 w-full rounded"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          className="border p-1 w-full rounded"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button className="bg-green-500 text-white px-2 py-1 rounded" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}
