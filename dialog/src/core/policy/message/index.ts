import { IPSendMessage } from "./intent/sendMessage";
import { VPMessages } from "./view/messages";

export const messageViewPolicy = {
  messages: VPMessages,
};

export const messageIntentPolicy = {
  sendMessage: IPSendMessage,
};
