export type TimeRaw = {
  number: number;
  string: string;
};

export type TimeDisplay = {
  Y: number;
  M: number;
  D: number;
  h: number;
  m: number;
  s: number;
};

export type TimePadded = {
  Y: string;
  M: string;
  D: string;
  h: string;
  m: string;
  s: string;
};

export type TimeWeek = {
  number: number;
  daystring: string;
};

export type Time = {
  raw: TimeRaw;
  display: TimeDisplay;
  padded: TimePadded;
  week: TimeWeek;
};
