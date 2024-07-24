import { Hobby } from "./Hobby";

export type User = {
  id: string;
  name: string;
  hobbies: Hobby[];
};
