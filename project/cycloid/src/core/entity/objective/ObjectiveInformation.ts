import { OBJECTIVE_TITLE } from "../../constant/objective/objectiveTitle";
import { BoxStyle, TextStyle } from "../common/style/Style";
import { Time } from "../common/time/Time";
import { User } from "../user/User";

export type ObjectiveInformation = {
  title: OBJECTIVE_TITLE;
  isCleared: boolean;
  at: Time;
  style?: TextStyle & BoxStyle;
  createdBy: User;
  createdAt: Time;
  lastUpdatedBy?: User;
  lastUpdatedAt?: Time;
};
