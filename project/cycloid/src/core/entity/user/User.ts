import { ID } from "../../constant/common/id";
import { USER_NAME } from "../../constant/user/userName";

export type User = {
  id: ID;
  name: USER_NAME;
};

export type UserDetail = User & {
  createdAt: string;
  lastUpdatedAt?: string;
};
