import { Task } from "@/types";

type Props = {
  task: Task;
  onMoveLeft: (task: Task) => void;
  onMoveRight: (task: Task) => void;
  onToggleToday: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onOpenFinalApproach: (task: Task) => void;
  isToday: boolean;
};

export default function TaskCard({
  task,
  onMoveLeft,
  onMoveRight,
  onToggleToday,
  onDelete,
  onOpenFinalApproach,
  isToday,
}: Props) {
  const checklist = task.finalApproach?.checklist ?? [];
  const completed = checklist.filter((item) => item.done).length;

  return (
    <div className="task-card fade-in">
      <p className="task-title">{task.title}</p>

      {task.notes ? (
        <p className="task-notes">{task.notes}</p>
      ) : null}

      {task.link ? (
        <a
          href={task.link}
          target="_blank"
          rel="noreferrer"
          className="task-link"
        >
          View link
        </a>
      ) : null}

      {checklist.length > 0 ? (
        <p className="task-checklist">
          Final Approach: {completed}/{checklist.length}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => onMoveLeft(task)}
          className="btn-small"
        >
          ←
        </button>
        <button
          onClick={() => onMoveRight(task)}
          className="btn-small"
        >
          →
        </button>
        <button
          onClick={() => onToggleToday(task.id)}
          className="btn-small"
        >
          {isToday ? "Remove Today" : "Add Today"}
        </button>
        <button
          onClick={() => onOpenFinalApproach(task)}
          className="btn-small"
        >
          Final Approach
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn-small text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}