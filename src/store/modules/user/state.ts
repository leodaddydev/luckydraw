import { User } from "@/@types";

export type UserState = {
  data: User;
};

export const state: UserState = {
  data: {} as User,
};
