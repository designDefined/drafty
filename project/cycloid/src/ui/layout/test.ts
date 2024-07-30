import { useEffect, useState } from "react";

export const usePromise = () => {
  const [prom, setProm] = useState<Promise<unknown> | undefined>(
    new Promise(() => {}),
  );

  useEffect(() => {
    prom?.then(() => {
      console.log("done");
      setProm(undefined);
    });
  }, [prom]);

  return { prom };
};

export const useTest = () => {
  const { prom } = usePromise();

  if (prom !== undefined) throw prom;

  return "done";
};
