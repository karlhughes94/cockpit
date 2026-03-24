"use client";

import { useState } from "react";
import { Task } from "@/types";

type Props = {
  task: Task | null;
  onClose: () => void;
  onAddChecklistItem: (taskId: string, text: string) => void;
  onToggleChecklistItem: (taskId: string, itemId: string) => void;
  onMarkLanded: (taskId: string) => void;
};

export default function FinalApproachModal({
  task,
  onClose,
  onAddChecklistItem,
  onToggleChecklistItem,
  onMarkLanded,
}: Props) {
  const [text, setText] = useState("");

  if (!task) return null;

  const currentTask: Task = task;
  const checklist = currentTask.finalApproach?.checklist ?? [];
  const allDone = checklist.length > 0 && checklist.every((item) => item.done);

  function handleAdd() {
    if (!text.trim()) return;
    onAddChecklistItem(currentTask.id, text);
    setText("");
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Final Approach</p>
            <h2 className="text-lg font-semibold">{currentTask.title}</h2>
          </div>

          <button onClick={onClose} className="text-sm text-gray-500">
            Close
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add checklist item"
            className="form-input flex-1"
          />
          <button
            onClick={handleAdd}
            className="btn-secondary"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {checklist.length === 0 ? (
            <p className="text-sm text-gray-600">No checklist items yet.</p>
          ) : (
            checklist.map((item) => (
              <label
                key={item.id}
                className="task-card flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => onToggleChecklistItem(currentTask.id, item.id)}
                />
                <span className={item.done ? "line-through text-gray-400" : ""}>
                  {item.text}
                </span>
              </label>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Go Around
          </button>

          <button
            onClick={() => {
              onMarkLanded(currentTask.id);
              onClose();
            }}
            disabled={!allDone}
            className="btn-primary disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Land Feature
          </button>
        </div>
      </div>
    </div>
  );
}