import { mapUserDtoToUser } from "./map";
import { UserDto } from "./dto";
import { mockApi } from "..";
import { delay, error } from "fetch";

export const UserRepository = {
  me: () =>
    mockApi
      .get("/me")
      .then(delay())
      .then(error(0))
      .then(UserDto.parse)
      .then(mapUserDtoToUser),
};
