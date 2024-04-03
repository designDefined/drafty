import { mockApi } from "@lib/core/fetch/mock";
import { mapUserDtoToUser } from "./map";
import { UserDto } from "./dto";

export const UserRepository = {
  me: mockApi.get("/me").then(UserDto.parse).then(mapUserDtoToUser),
};
