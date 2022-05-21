import { User } from "@/@types";
import { MutationTree } from "vuex";
import type { UserState } from "./state";

export const mutations: MutationTree<UserState> = {
  setUser(state: UserState, user: User) {
    state.data = user;
  },
};
