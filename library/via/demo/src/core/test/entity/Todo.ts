import { User } from "./User";

export type Todo = {
  id: string;
  content: string;
  isCompleted: boolean;
  date: { year: number; month: number; day: number };
  assignedUsers: User[];
};
