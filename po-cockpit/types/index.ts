// Type definitions
export type Lane = {
  id: string;
  name: string;
};

export type Column = {
  id: string;
  name: string;
};

export type ChecklistItem = {
  id: string;
  text: string;
  done: boolean;
};

export type FinalApproach = {
  checklist: ChecklistItem[];
};

export type Task = {
  id: string;
  title: string;
  laneId: string;
  columnId: string;
  link?: string;
  notes?: string;
  finalApproach?: FinalApproach;
};

export type NewTaskInput = {
  title: string;
  laneId: string;
  columnId: string;
  link?: string;
  notes?: string;
};