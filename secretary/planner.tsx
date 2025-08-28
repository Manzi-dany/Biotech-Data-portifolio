"use client";

import { useState } from "react";

export default function Planner() {
  const [itinerary, setItinerary] = useState<string[]>([
    "9:00 AM - Check emails",
    "10:00 AM - Meeting with team",
    "12:00 PM - Lunch",
  ]);

  const handleAddTask = () => {
    const task = prompt("Enter new task:");
    if (task) setItinerary([...itinerary, task]);
  };

  return (
    <div className="border p-4 rounded-md space-y-2">
      <h3 className="font-semibold">Daily Itinerary</h3>
      <ul className="list-disc list-inside space-y-1">
        {itinerary.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ul>
      <button className="bg-purple-500 text-white px-2 py-1 rounded" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
}
