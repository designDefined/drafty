import { z } from "zod";
import { USER_ID } from "@core/base/constant/id";

export const Identified = {
  user: z.object({ id: USER_ID }),
};
// export type Identified = EnumTyped<GenericTyped<typeof Identified>>;
