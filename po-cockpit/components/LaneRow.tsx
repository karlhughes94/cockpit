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
  onMoveLeft: (task: Task) => void;
  onMoveRight: (task: Task) => void;
  onToggleToday: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onOpenFinalApproach: (task: Task) => void;
};

export default function LaneRow({
  lane,
  columns,
  tasks,
  todayTaskIds,
  onMoveLeft,
  onMoveRight,
  onToggleToday,
  onDelete,
  onOpenFinalApproach,
}: Props) {
  return (
    <div className="board-grid">
      <div className="lane-header">
        {lane.name}
      </div>

      {columns.map((column) => {
        const laneTasks = tasks.filter(
          (task) => task.laneId === lane.id && task.columnId === column.id
        );

        return (
          <div key={column.id} className="lane-column">
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