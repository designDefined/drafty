import { z } from "zod";
import { USER_ID } from "@core/base/constants/id";

export const Identified = {
  user: z.object({ id: USER_ID }).extend,
};
// export type Identified = EnumTyped<GenericTyped<typeof Identified>>;
