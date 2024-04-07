import { VPMessage } from "./message/view/message";
import { VPMessages } from "./message/view/messages";
import { VPPendingMessages } from "./message/view/pendingMessages";
import { VPMe } from "./user/view/me";

export const viewPolicy = {
  user: {
    me: VPMe,
  },
  message: {
    message: VPMessage,
    messages: VPMessages,
    pendingMessages: VPPendingMessages,
  },
};
