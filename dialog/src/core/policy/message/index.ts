import { IPPendMessage } from "./intent/pendMessage";
import { IPSendMessage } from "./intent/sendMessage";
import { VPMessages } from "./view/messages";
import { VPPendingMessages } from "./view/pendingMessages";

export const messageViewPolicy = {
  messages: VPMessages,
  pendingMessages: VPPendingMessages,
};

export const messageIntentPolicy = {
  sendMessage: IPSendMessage,
  pendMessage: IPPendMessage,
};
