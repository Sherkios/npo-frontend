import type { IUserRow } from "src/types";
import { computed, ref } from "vue";

export default function useUser() {
  const _users = ref<IUserRow[]>([]);
  const users = computed(() => _users.value);

  const getUsers = () => {
    const storage = localStorage.getItem("users");

    if (storage) {
      const result = JSON.parse(storage) as IUserRow[];
      _users.value = result;
    }
  };

  getUsers();

  const saveUser = (user: IUserRow) => {
    const storage = localStorage.getItem("users");

    if (storage) {
      const users = JSON.parse(storage) as IUserRow[];

      users.push(user);
      _users.value = users;

      localStorage.setItem("users", JSON.stringify(users));
    } else {
      localStorage.setItem("users", JSON.stringify([user]));
    }
  };

  const signIn = (form: { login: string; tabel: string; password: string }) => {
    console.log(form.login, form.tabel, form.password);
  };

  const signInWithSave = (form: { login: string; tabel: string; password: string }) => {
    signIn(form);

    const user: IUserRow = {
      id: _users.value.length + 1,
      login: form.login,
      tabel: form.tabel,
      img: "public/avatae.png",
    };

    saveUser(user);
  };

  return { users, signIn, signInWithSave };
}
