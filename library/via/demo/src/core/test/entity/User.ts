import { Hobby } from "./Hobby";

export type User = {
  id: string;
  name: string;
  hobbies: Hobby[];
};

export type UserDetail = User & {
  statistics: {
    todo: {
      date: string;
      counts: {
        total: number;
        completed: number;
        uncompleted: number;
      };
    };
  };
};
