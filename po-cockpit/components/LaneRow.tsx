// LaneRow component
// Represents a single swim lane (e.g. TM, ETL)
// Renders tasks grouped by column within that lane

import { Column, Lane, Task } from "@/types";
import TaskCard from "./TaskCard";

type Props = {
  lane: Lane;
  columns: Column[];
  tasks: Task[];
  todayTaskIds: string[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onMoveLeft: (task: Task) => void;
  onMoveRight: (task: Task) => void;
  onToggleToday: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onOpenFinalApproach: (task: Task) => void;
  onMoveTask: (taskId: string, laneId: string, columnId: string) => void;
};

export default function LaneRow({
  lane,
  columns,
  tasks,
  todayTaskIds,
  isCollapsed,
  onToggleCollapse,
  onMoveLeft,
  onMoveRight,
  onToggleToday,
  onDelete,
  onOpenFinalApproach,
  onMoveTask,
}: Props) {
  return (
    <div className="board-grid">
      <div className="lane-header">
        <div className="flex items-center justify-between gap-2">
          <span>{lane.name}</span>
          <button
            onClick={onToggleCollapse}
            className="btn-small btn-secondary"
          >
            {isCollapsed ? "Expand" : "Collapse"}
          </button>
        </div>
      </div>

      {columns.map((column) => {
        if (isCollapsed) {
          return (
            <div
              key={column.id}
              className="lane-column collapsed"
              aria-hidden="true"
            />
          );
        }

        const laneTasks = tasks.filter(
          (task) => task.laneId === lane.id && task.columnId === column.id
        );

        return (
          <div
            key={column.id}
            className="lane-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const taskId = e.dataTransfer.getData("text/plain");
              if (!taskId) return;
              onMoveTask(taskId, lane.id, column.id);
            }}
          >
            {laneTasks.length === 0 ? (
              <p className="text-sm text-gray-400">No tasks</p>
            ) : (
              laneTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onMoveLeft={onMoveLeft}
                  onMoveRight={onMoveRight}
                  onToggleToday={onToggleToday}
                  onDelete={onDelete}
                  onOpenFinalApproach={onOpenFinalApproach}
                  isToday={todayTaskIds.includes(task.id)}
                />
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}