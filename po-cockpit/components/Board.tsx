// Board component
// Renders the matrix layout:
// - columns across the top (status)
// - lanes as rows (domains)
// - each cell contains tasks filtered by lane + column

import { useState } from "react";
import { Column, Lane, Task } from "@/types";
import LaneRow from "./LaneRow";

type Props = {
  lanes: Lane[];
  columns: Column[];
  tasks: Task[];
  todayTaskIds: string[];
  onMoveLeft: (task: Task) => void;
  onMoveRight: (task: Task) => void;
  onToggleToday: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onOpenFinalApproach: (task: Task) => void;
  onMoveTask: (taskId: string, laneId: string, columnId: string) => void;
};

export default function Board({
  lanes,
  columns,
  tasks,
  todayTaskIds,
  onMoveLeft,
  onMoveRight,
  onToggleToday,
  onDelete,
  onOpenFinalApproach,
  onMoveTask,
}: Props) {
  const [collapsedLanes, setCollapsedLanes] = useState<Set<string>>(new Set());

  const toggleLane = (laneId: string) => {
    setCollapsedLanes((prev) => {
      const next = new Set(prev);
      if (next.has(laneId)) {
        next.delete(laneId);
      } else {
        next.add(laneId);
      }
      return next;
    });
  };

  return (
    <section className="panel">
      <div className="board-grid border-b pb-3">
        <div className="text-sm font-semibold text-gray-700">Domain</div>
        {columns.map((column) => (
          <div key={column.id} className="text-sm font-semibold text-gray-700">
            {column.name}
          </div>
        ))}
      </div>

      <div>
        {lanes.map((lane) => (
          <LaneRow
            key={lane.id}
            lane={lane}
            columns={columns}
            tasks={tasks}
            todayTaskIds={todayTaskIds}
            isCollapsed={collapsedLanes.has(lane.id)}
            onToggleCollapse={() => toggleLane(lane.id)}
            onMoveLeft={onMoveLeft}
            onMoveRight={onMoveRight}
            onToggleToday={onToggleToday}
            onDelete={onDelete}
            onOpenFinalApproach={onOpenFinalApproach}
            onMoveTask={onMoveTask}
          />
        ))}
      </div>
    </section>
  );
}