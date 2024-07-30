import { delay, error } from "fetch";
import { mockApi } from "..";
import { MessageDto } from "./dto";
import { mapMessageDtoToMessage } from "./map";
import { PAGE_NUMBER } from "@core/constant/page";

export const MessageRepository = {
  messages: (pageNumber?: PAGE_NUMBER) =>
    mockApi
      .get(`/messages?_sort=id&_order=desc&_page=${pageNumber ?? 1}`)
      .then(delay())
      .then(error(0))
      .then(MessageDto.array().parse)
      .then((data) => ({ data, next: (pageNumber ?? 1) + 1 })),
  message: (id: MessageDto["id"]) =>
    mockApi
      .get(`/messages/${id}`)
      .then(delay())
      .then(MessageDto.parse)
      .then(mapMessageDtoToMessage),
  sendMessage: (request: { text: string }) =>
    mockApi
      .post("/messages", { ...request, createTime: new Date() })
      .then(delay())
      .then(MessageDto.parse)
      .then(mapMessageDtoToMessage),
  patchMessage: (id: MessageDto["id"], request: { text: string }) =>
    mockApi
      .patch(`/messages/${id}`, request)
      .then(delay())
      .then(MessageDto.parse)
      .then(mapMessageDtoToMessage),
};
