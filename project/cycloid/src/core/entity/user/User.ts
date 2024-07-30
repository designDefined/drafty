import { ID } from "@/core/constant/common/id";
import { USER_NAME } from "@/core/constant/user/userName";

export type User = {
  id: ID;
  name: USER_NAME;
};

export type UserDetail = User & {
  createdAt: string;
  lastUpdatedAt?: string;
};
