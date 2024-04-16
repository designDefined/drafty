import { User } from "@core/entity/user";
import { UserDto } from "./dto";

export const mapUserDtoToUser = (dto: UserDto): User => dto;
