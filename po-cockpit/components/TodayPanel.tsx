import { Task } from "@/types";

type Props = {
  tasks: Task[];
  onRemoveFromToday: (taskId: string) => void;
};

export default function TodayPanel({ tasks, onRemoveFromToday }: Props) {
  return (
    <section className="today-panel">
      <h2 className="mb-3 text-lg font-semibold">Today</h2>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600">No tasks selected for today.</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="task-card"
            >
              <div>
                <p className="task-title">{task.title}</p>
                <p className="task-notes">{task.laneId.toUpperCase()}</p>
              </div>

              <button
                onClick={() => onRemoveFromToday(task.id)}
                className="btn-secondary"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}