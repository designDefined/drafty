import { useStore } from "@via/react";
import { useEffect, useState } from "react";
import { Div, Span } from "fluid";
import { Button } from "fluid/src/minimal";

export default function StoreTest() {
  const [counts, setCounts] = useState({ status: 0, values: 0, set: 0 });

  const [[values, status], set] = useStore<{ value: number }>({
    key: "testKey",
    from: () => ({ value: 0 }),
  });

  useEffect(() => {
    setCounts((prev) => ({ ...prev, status: prev.status + 1 }));
  }, [status]);

  useEffect(() => {
    setCounts((prev) => ({ ...prev, values: prev.values + 1 }));
  }, [values]);

  useEffect(() => {
    setCounts((prev) => ({ ...prev, set: prev.set + 1 }));
  }, [set]);

  return (
    <Div flex={[0, 0, "auto"]} spacing={[20, 10]}>
      <Div className="sans h2">Store Test</Div>
      <Div flow={["row", "nowrap", "center"]} spacing={[0, 10]}>
        <Span flex={[0, 0, "auto"]} className="sans bold">
          CURRENT VALUE:
        </Span>
        {values.value && (
          <Span flex={[0, 0, "auto"]} className="sans">
            {values.value.value}
          </Span>
        )}
        <Button.Default
          className="sans "
          theme="stroked"
          flex={[0, 0, "auto"]}
          spacing={["4px 8px"]}
          onClick={() =>
            set((prev) => {
              prev.value += 1;
            })
          }
        >
          +
        </Button.Default>
      </Div>

      <Div flow={["row", "nowrap", "center"]} spacing={[0, 10]}>
        <Span flex={[0, 0, "auto"]} className="sans bold">
          Rerender Counts:
        </Span>
        <Span flex={[0, 0, "auto"]} className="sans">
          status: {counts.status} / values: {counts.values} / set: {counts.set}
        </Span>
      </Div>
    </Div>
  );
}
