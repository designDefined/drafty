import { INTERVAL_TYPE } from "../../constant/cycle/intervalType";

export type DailyInterval = {
  type: INTERVAL_TYPE["DAILY"];
  distance: number;
};

export type WeeklyInterval = {
  type: INTERVAL_TYPE["WEEKLY"];
  distance: number;
  day: number; // 0: Sunday, 1: Monday, ..., 6: Saturday
};

export type MonthlyInterval = {
  type: INTERVAL_TYPE["MONTHLY"];
  distance: number;
  date: number; // 1 ~ 31
};

export type Interval = DailyInterval | WeeklyInterval | MonthlyInterval;
