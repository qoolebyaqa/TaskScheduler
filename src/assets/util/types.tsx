import store from "../../store";

export type TaskRelatedState = ReturnType<typeof store.getState>;
export type TaskItem = {
  description: string;
  duedate: string;
  id: string;
  reserveDays: number;
  stage: string;
  title: string;
  completedDate?: number | string;
  creationDate?: number | string;
  today?: number | string;
};
export type DBObject = {
  id: string;
  sender: string;
  tasksArr: TaskItem;
};

export interface handleSignInShowProps {
  onRevertForm: () => void;
}
