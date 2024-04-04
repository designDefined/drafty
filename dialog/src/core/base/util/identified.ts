import { z } from "zod";
import { MESSAGE_ID, USER_ID } from "@/core/base/constant/id";

export const Identified = {
  user: z.object({ id: USER_ID }),
  message: z.object({ id: MESSAGE_ID }),
};
// export type Identified = EnumTyped<GenericTyped<typeof Identified>>;
