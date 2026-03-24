"use client";

import { useState } from "react";

type Props = {
  onAddLane: (name: string) => void;
};

export default function AddLane({ onAddLane }: Props) {
  const [name, setName] = useState("");

  function handleAdd() {
    if (!name.trim()) return;
    onAddLane(name);
    setName("");
  }

  return (
    <div className="flex items-center gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add new lane"
        className="rounded-lg border px-3 py-2 text-sm outline-none"
      />
      <button
        onClick={handleAdd}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
      >
        + Add Lane
      </button>
    </div>
  );
}