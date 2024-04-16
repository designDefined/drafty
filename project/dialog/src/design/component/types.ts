import { cssNamed } from "@/design/style";

export type StyleProps<Merge extends ReturnType<typeof cssNamed>["merge"]> = {
  customStyle?: Parameters<Merge>[0];
};
