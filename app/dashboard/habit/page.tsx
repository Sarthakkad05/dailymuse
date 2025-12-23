"use client";
import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WeeklyHabitTracker() {
  const [logs, setLogs] = useState(Array(7).fill(false));

  const toggleDay = (index) => {
    setLogs((prev) => {
      const newLogs = [...prev];
      newLogs[index] = !newLogs[index];
      return newLogs;
    });
  };

  return (
    <div className="p-4 border rounded-xl bg-white dark:bg-neutral-900">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr>
            {DAYS.map((day) => (
              <th key={day} className="p-2 font-medium text-sm border-b">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {DAYS.map((_, i) => (
              <td
                key={i}
                onClick={() => toggleDay(i)}
                className="cursor-pointer p-3 text-xl hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md"
              >
                {logs[i] ? "✅" : "❌"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
