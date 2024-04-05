import { IPPatchMessage } from "./intent/patchMessage";
import { IPPendMessage } from "./intent/pendMessage";
import { IPSendMessage } from "./intent/sendMessage";
import { VPMessage } from "./view/message";
import { VPMessages } from "./view/messages";
import { VPPendingMessages } from "./view/pendingMessages";

export const messageViewPolicy = {
  message: VPMessage,
  messages: VPMessages,
  pendingMessages: VPPendingMessages,
};

export const messageIntentPolicy = {
  sendMessage: IPSendMessage,
  pendMessage: IPPendMessage,
  patchMessage: IPPatchMessage,
};
