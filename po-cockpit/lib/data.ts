import { Column, Lane, Task } from "@/types";

export const defaultLanes: Lane[] = [
  { id: "tm", name: "TM" },
  { id: "etl", name: "ETL" },
  { id: "other", name: "OTHER" },
];

export const defaultColumns: Column[] = [
  { id: "upcoming", name: "Upcoming" },
  { id: "inflight", name: "Inflight" },
  { id: "landed", name: "Landed" },
];

export const defaultTasks: Task[] = [
  {
    id: "task-1",
    title: "Review TM backlog",
    laneId: "tm",
    columnId: "upcoming",
    notes: "Check priority items for this week",
  },
  {
    id: "task-2",
    title: "Validate ETL mapping changes",
    laneId: "etl",
    columnId: "inflight",
    link: "https://example.com",
    finalApproach: {
      checklist: [
        { id: "fa-1", text: "Data validated", done: false },
        { id: "fa-2", text: "Stakeholders notified", done: false },
        { id: "fa-3", text: "Documentation updated", done: false },
      ],
    },
  },
];