import { Message } from "@core/entity/message";
import { MessageDto } from "./dto";

export const mapMessageDtoToMessage = (dto: MessageDto): Message => dto;
