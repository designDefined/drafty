import { z } from "zod";
import { FAKE_ID, MESSAGE_ID, USER_ID } from "@/core/base/constant/id";

export const Identified = {
  user: z.object({ id: USER_ID }),
  message: z.object({ id: MESSAGE_ID }),
  fakeMessage: z.object({ id: FAKE_ID }),
};
// export type Identified = EnumTyped<GenericTyped<typeof Identified>>;
