import { User } from "@/core/base/entity/user";
import { UserDto } from "./dto";

export const mapUserDtoToUser = (dto: UserDto): User => dto;
