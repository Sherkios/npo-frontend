import { isAxiosError, type AxiosResponse } from "axios";
import isError from "src/helpers/guards/is-error";
import api from "src/service/api/api";
import { saveJwt } from "src/service/jwt";
import type { IAccessToken, IUser, IUserRow } from "src/types";
import { computed, ref } from "vue";

export default function useUser() {
  const _users = ref<IUserRow[]>([]);
  const users = computed(() => _users.value.map(value => value));

  const getStorageUsers = () => {
    const storage = localStorage.getItem("users");

    if (storage) {
      const result = JSON.parse(storage) as IUserRow[];
      _users.value = result;
    }
  };

  getStorageUsers();

  const saveUser = (user: IUserRow) => {
    const storage = localStorage.getItem("users");

    if (storage) {
      const users = JSON.parse(storage) as IUserRow[];

      const oldUser = users.find(value => user.id === value.id);
      console.log("old", oldUser, user);

      if (!oldUser) {
        users.push(user);
        _users.value = users;

        localStorage.setItem("users", JSON.stringify(users));
      }
    } else {
      localStorage.setItem("users", JSON.stringify([user]));
    }
  };

  const getUsers = async (): Promise<IUser[]> => {
    try {
      const users: AxiosResponse<IUser[]> = await api.get("users");

      return users.data;
    } catch (error) {
      throw new Error("Ошибка получения пользователей");
    }
  };

  const signIn = async (form: {
    login: string;
    tabel: string;
    password: string;
  }): Promise<IAccessToken | Error> => {
    try {
      const response: AxiosResponse<IAccessToken> = await api.post("auth/login", {
        ...form,
      });

      const token = response.data;
      saveJwt(token.access_token);

      return token;
    } catch (error) {
      if (isAxiosError(error)) {
        return new Error("Ошибка авторизации");
      }
      throw new Error("Непредвиденная ошибка");
    }
  };

  const signInWithSave = async (form: {
    login: string;
    tabel: string;
    password: string;
  }): Promise<IAccessToken | Error> => {
    const response = await signIn(form);

    if (!isError(response)) {
      const user: IUserRow = {
        id: response.id,
        login: form.login,
        tabel: form.tabel,
        img: "public/avatae.png",
      };

      console.log(user);

      saveUser(user);
    }

    return response;
  };

  return { users, signIn, signInWithSave, getUsers };
}
