import { IPPatchMessage } from "./message/intent/patchMessage";
import { IPPendMessage } from "./message/intent/pendMessage";
import { IPSendMessage } from "./message/intent/sendMessage";
import { IPChangeProfile } from "./user/intent/changeProfile";

export const intentPolicy = {
  user: {
    changeProfile: IPChangeProfile,
  },
  message: {
    sendMessage: IPSendMessage,
    patchMessage: IPPatchMessage,
    pendMessage: IPPendMessage,
  },
};
