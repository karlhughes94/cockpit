// PO Cockpit - Main page
// This composes the full UI:
// - header (title, focus mode, add task)
// - today panel
// - board (lanes x columns)
// - final approach modal
//
// Uses the useBoard hook for all state and actions.

"use client";

import { useState } from "react";
import AddLane from "@/components/AddLane";
import AddTaskModal from "@/components/AddTaskModal";
import Board from "@/components/Board";
import FinalApproachModal from "@/components/FinalApproachModal";
import FocusToggle from "@/components/FocusToggle";
import TodayPanel from "@/components/TodayPanel";
import { useBoard } from "@/hooks/useBoard";
import { Task } from "@/types";

export default function Home() {
  console.log({ AddLane, AddTaskModal, Board, FinalApproachModal, FocusToggle, TodayPanel });
  const board = useBoard();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-500">Personal work board</p>
            <h1 className="text-3xl font-bold">PO Cockpit</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FocusToggle
              focusMode={board.focusMode}
              setFocusMode={board.setFocusMode}
            />
            <AddTaskModal
              lanes={board.lanes}
              columns={board.columns}
              onAddTask={board.addTask}
            />
          </div>
        </header>

        <TodayPanel
          tasks={board.todayTasks}
          onRemoveFromToday={board.toggleToday}
        />

        <div className="flex justify-end">
          <AddLane onAddLane={board.addLane} />
        </div>

        <Board
          lanes={board.lanes}
          columns={board.visibleColumns}
          tasks={board.tasks}
          todayTaskIds={board.todayTaskIds}
          onMoveLeft={board.moveTaskLeft}
          onMoveRight={board.moveTaskRight}
          onToggleToday={board.toggleToday}
          onDelete={board.deleteTask}
          onOpenFinalApproach={setSelectedTask}
        />

        <FinalApproachModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onAddChecklistItem={board.addChecklistItem}
          onToggleChecklistItem={board.toggleChecklistItem}
          onMarkLanded={board.markTaskLanded}
        />
      </div>
    </main>
  );
}