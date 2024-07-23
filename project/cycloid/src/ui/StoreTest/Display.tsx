import { useStore } from "@via/react";
import { useEffect } from "react";

export default function Display() {
  const [[values, status], set] = useStore<{ value: number }>({
    key: "testKey",
    from: () => ({ value: 5 }),
  });

  useEffect(() => {
    console.count("STATUS RERENDER");
  }, [status]);

  useEffect(() => {
    console.count("VALUES RERENDER");
  }, [values]);

  if (!values.value) return null;

  return (
    <div>
      <button
        onClick={() => {
          set((prev) => {
            prev.value += 1;
          });
        }}
      >
        {values.value.value}
      </button>
    </div>
  );
}
