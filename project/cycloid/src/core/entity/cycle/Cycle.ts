import { ID } from "@/core/constant/common/id";
import { CYCLE_NAME } from "@/core/constant/cycle/cycleName";

import { Objective } from "../objective/Objective";
import { User } from "../user/User";

import { Interval } from "./Interval";

export type Cycle = {
  id: ID;
  name: CYCLE_NAME;
  interval: Interval;
  objectives: Objective[];
  createdBy: User;
  createdAt: string;
  lastUpdatedBy?: User;
  lastUpdatedAt?: string;
};
