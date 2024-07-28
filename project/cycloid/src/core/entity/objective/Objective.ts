import { OBJECTIVE_TYPE } from "../../constant/objective/objectiveType";
import { ObjectiveInformation } from "./ObjectiveInformation";
import { Todo } from "./todo/Todo";
import { TodoCount } from "./todo/TodoCount";

export type TodoObjective = ObjectiveInformation & {
  type: OBJECTIVE_TYPE["TODO"];
  todos: Todo[];
  count: TodoCount;
  isEditable: boolean;
};

export type Objective = TodoObjective;
