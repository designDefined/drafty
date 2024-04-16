import { ID } from "@core/constant/id";
import { z } from "zod";

export const Identified = {
  user: z.object({ id: ID.USER }),
  message: z.object({ id: ID.MESSAGE }),
  pendingMessage: z.object({ id: ID.PENDING_MESSAGE }),
};
// export type Identified = EnumTyped<GenericTyped<typeof Identified>>;
