import { Message } from "@core/base/entity/message";
import { MessageDto } from "./dto";

export const mapMessageDtoToMessage = (dto: MessageDto): Message => dto;
