import { IntentModel, IntentPolicy } from "@policy-maker/core";
import { TypeOf } from "zod";
import { InputState, useInput } from "./useInput";
import { useState } from "react";

export type ImplementedIntentPolicy<Model extends IntentModel> = ReturnType<
  IntentPolicy<unknown[], Model>
>;

type Param<Model extends IntentModel> = {
  policy: ImplementedIntentPolicy<Model>;
  repository: (
    input: TypeOf<Model["input"]>,
  ) => Promise<TypeOf<Model["output"]>>;
  initialData: Required<TypeOf<Model["input"]>>;
};

type Send<Model extends IntentModel> = (
  input: TypeOf<Model["input"]>,
) => Promise<TypeOf<Model["output"]>>;

type Input<Model extends IntentModel> = InputState<Model["input"]>;

type Submit<Model extends IntentModel> = () => Promise<TypeOf<Model["output"]>>;

type Return<Model extends IntentModel> = Input<Model> & {
  send: Send<Model>;
  submit: Submit<Model>;
  isWorking: boolean;
};

export const useIntent = <Model extends IntentModel>({
  policy,
  repository,
  initialData,
}: Param<Model>): Return<Model> => {
  const [isWorking, setIsWorking] = useState(false);
  const input = useInput<Model["input"]>(policy.model.input, initialData);
  const send: Send<Model> = (data) => {
    if (isWorking) return Promise.reject();
    setIsWorking(true);
    return repository(data)
      .then((data) => {
        setIsWorking(false);
        return data;
      })
      .catch((e) => {
        setIsWorking(false);
        return Promise.reject(e);
      });
  };
  const submit: Submit<Model> = () => {
    if (!input.isValid || isWorking) return Promise.reject();
    setIsWorking(true);
    return repository(input.inputValues)
      .then((data) => {
        setIsWorking(false);
        input.reset();
        return data;
      })
      .catch((e) => {
        setIsWorking(false);
        return Promise.reject(e);
      });
  };
  return { ...input, send, submit, isWorking };
};
