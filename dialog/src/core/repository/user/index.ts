import { mockApi, delay, error } from "@lib/core/fetch";
import { mapUserDtoToUser } from "./map";
import { UserDto } from "./dto";

export const UserRepository = {
  me: () =>
    mockApi
      .get("/me")
      .then(delay())
      .then(error(0))
      .then(UserDto.parse)
      .then(mapUserDtoToUser),
};
