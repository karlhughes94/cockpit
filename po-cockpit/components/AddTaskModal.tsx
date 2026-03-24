"use client";

import { useState } from "react";
import { Column, Lane, NewTaskInput } from "@/types";

type Props = {
  lanes: Lane[];
  columns: Column[];
  onAddTask: (input: NewTaskInput) => void;
};

export default function AddTaskModal({ lanes, columns, onAddTask }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [laneId, setLaneId] = useState(lanes[0]?.id ?? "");
  const [columnId, setColumnId] = useState(columns[0]?.id ?? "");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      laneId,
      columnId,
      link: link.trim(),
      notes: notes.trim(),
    });

    setTitle("");
    setLink("");
    setNotes("");
    setLaneId(lanes[0]?.id ?? "");
    setColumnId(columns[0]?.id ?? "");
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary"
      >
        + Add Task
      </button>

      {open && (
        <div className="modal-overlay">
          <div className="modal-content w-full max-w-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add Task</h2>
              <button onClick={() => setOpen(false)} className="text-sm text-gray-500">
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  placeholder="Enter task title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Lane</label>
                  <select
                    value={laneId}
                    onChange={(e) => setLaneId(e.target.value)}
                    className="form-input"
                  >
                    {lanes.map((lane) => (
                      <option key={lane.id} value={lane.id}>
                        {lane.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Status</label>
                  <select
                    value={columnId}
                    onChange={(e) => setColumnId(e.target.value)}
                    className="form-input"
                  >
                    {columns.map((column) => (
                      <option key={column.id} value={column.id}>
                        {column.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Link</label>
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="form-input"
                  placeholder="Paste Azure DevOps link"
                />
              </div>

              <div>
                <label className="form-label">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-input"
                  rows={4}
                  placeholder="Optional notes"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}