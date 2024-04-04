import { mockApi, delay, error } from "@lib/core/fetch";
import { MessageDto } from "./dto";
import { mapMessageDtoToMessage } from "./map";

export const MessageRepository = {
  messages: () =>
    mockApi
      .get("/messages")
      .then(delay())
      .then(error(0))
      .then(MessageDto.array().parse)
      .then((data) => ({ data: data.map(mapMessageDtoToMessage) })),
  sendMessage: (request: { text: string }) =>
    mockApi
      .post("/messages", { ...request, createTime: new Date() })
      .then(MessageDto.parse)
      .then(mapMessageDtoToMessage),
};
