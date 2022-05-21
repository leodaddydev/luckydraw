import { ActionTree } from "vuex";
import { AuthState } from "./state";
import { RootState } from "@/store/types";
import { useNotification } from "@/services/notification";

export const actions: ActionTree<AuthState, RootState> = {
  async login({ commit }, { email, password }) {
    const logedInData = {
      token: "123",
      user: {
        username: email,
        fullname: password,
      },
    };

    const { success } = useNotification();

    success("Login Success!");
    commit("setLogedIn", logedInData);
  },
};
