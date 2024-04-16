import { TypeOf, ZodObject, ZodRawShape, ZodType } from "zod";
import { PolicyKey } from "./common";
import { ViewConnectionInterface } from "./view";

type ZodAnyObject = ZodObject<ZodRawShape>;

export type IntentModel = { input: ZodAnyObject; output: ZodType };

type Result<Model extends IntentModel> = {
  input: TypeOf<Model["input"]>;
  output: TypeOf<Model["output"]>;
};

export type IntentPolicy<Deps extends unknown[], Model extends IntentModel> = (
  ...deps: Deps
) => {
  key: PolicyKey;
  model: Model;
  connect: (result: Result<Model>) => ViewConnectionInterface[];
};

export const IP = <Deps extends unknown[], Model extends IntentModel>(
  input: IntentPolicy<Deps, Model>,
) => input;
