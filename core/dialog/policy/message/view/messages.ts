import { PAGE_NUMBER } from "@core/constant/page";
import { Message } from "@core/entity/message";
import { Infinite } from "@core/entity/util/infinite";
import { VP } from "@policy-maker/core";

export const VPMessages = VP(() => ({
  key: ["message", "messages"],
  model: Infinite(Message, PAGE_NUMBER),
}));
