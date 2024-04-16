import { IntentModel, IntentPolicy } from "@policy-maker/core";
import { TypeOf } from "zod";
import { InputState, useInput } from "./useInput";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Wrapped } from "../function/wrap";

export type ImplementedIntentPolicy<Model extends IntentModel> = ReturnType<
  IntentPolicy<unknown[], Model>
>;

type Config = Partial<{
  immediateReset: boolean;
}>;

type Param<Model extends IntentModel> = {
  policy: ImplementedIntentPolicy<Model>;
  repository: (
    input: TypeOf<Model["input"]>,
  ) => Promise<TypeOf<Model["output"]>>;
  initialData: Required<TypeOf<Model["input"]>>;
  config?: Config;
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

const defaultConfig: Config = {
  immediateReset: false,
};

export const useIntent = <Model extends IntentModel>({
  policy,
  repository,
  initialData,
  config,
}: Param<Model>): Return<Model> => {
  const mergedConfig = { ...defaultConfig, ...config };
  const queryClient = useQueryClient();
  const [isWorking, setIsWorking] = useState(false);
  const inputs = useInput<Model["input"]>(policy.model.input, initialData);
  const send: Send<Model> = (input) => {
    if (isWorking) return Promise.reject();
    setIsWorking(true);
    return repository(input)
      .then((output) => {
        policy.connect({ input, output }).forEach((connection) => {
          if (connection.type === "invalidate")
            queryClient.invalidateQueries({ queryKey: connection.key });
          if (connection.type === "map")
            queryClient.setQueryData(
              connection.key,
              (prev: Wrapped<unknown> | undefined) => {
                if (!prev) return prev;
                const data = connection.mapFn(prev.data);
                return { ...prev, data };
              },
            );
        });
        setIsWorking(false);
        return output;
      })
      .catch((e) => {
        setIsWorking(false);
        return Promise.reject(e);
      });
  };
  const submit: Submit<Model> = () => {
    if (!inputs.isValid || isWorking) return Promise.reject();
    setIsWorking(true);
    const cachedInput = { ...inputs.inputValues };
    if (mergedConfig.immediateReset) inputs.reset();
    return repository(cachedInput)
      .then((output) => {
        policy
          .connect({ input: inputs.inputValues, output })
          .forEach((connection) => {
            if (connection.type === "invalidate")
              queryClient.invalidateQueries({ queryKey: connection.key });
            if (connection.type === "map")
              queryClient.setQueryData(
                connection.key,
                (prev: Wrapped<unknown> | undefined) => {
                  if (!prev) return prev;
                  const data = connection.mapFn(prev.data);
                  return { ...prev, data };
                },
              );
          });
        setIsWorking(false);
        if (!mergedConfig.immediateReset) inputs.reset();
        return output;
      })
      .catch((e) => {
        setIsWorking(false);
        return Promise.reject(e);
      });
  };
  return { ...inputs, send, submit, isWorking };
};
