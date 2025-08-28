"use client";

import Chat from "./chat";
import GuestForm from "./GuestForm";
import Planner from "./Planner"; // must match exact filename


export default function SecretaryPage() {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Your Personal Secretary</h2>
      <Chat />
      <GuestForm />
      <Planner />
    </div>
  );
}
