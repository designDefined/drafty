import { ID } from "../../../constant/common/id";
import { WritableContent } from "../../common/content/WritableContent";
import { BoxStyle, TextStyle } from "../../common/style/Style";
import { Time } from "../../common/time/Time";
import { User } from "../../user/User";

export type Todo = {
  id: ID;
  contents: WritableContent[];
  isDone: boolean;
  style?: TextStyle & BoxStyle;
};

export type TodoDetail = Todo & {
  at: Time;
  createdBy: User;
  createdAt: Time;
  lastUpdatedBy?: User;
  lastUpdatedAt?: Time;
};
