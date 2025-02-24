<template>
  <page-block class="auth-page">
    <div class="auth-page__content">
      <div v-if="isFullAuth" class="auth-page__auth">
        <div class="auth-page__header">
          <base-button v-if="isExistUsers" button-type="secondary" @click="toUsers">
            <template #base-button-left>
              <arrow-left-icon></arrow-left-icon>
            </template>

            <template #default>Назад</template>
          </base-button>

          <p v-else></p>

          <img src="public/logo.svg" alt="logo" />
        </div>

        <div class="auth-page__main">
          <h1 class="auth-page__title">Вход в ERP-систему</h1>

          <notificate-message v-if="isShowNotificate" :status="notificateStatus">{{
            notificateMessage
          }}</notificate-message>

          <div class="auth-page__form">
            <base-select
              v-model="authForm.tabel"
              :options="tabelOptions"
              placeholder="Введите табельный номер"
              class="auth-page__select"
            >
              Табельный номер
            </base-select>

            <base-select
              v-model="authForm.login"
              :options="loginOptions"
              placeholder="Введите логин"
              class="auth-page__select"
            >
              Логин
            </base-select>

            <password-input v-model="authForm.password" class="auth-page__input">
              Пароль
            </password-input>
          </div>

          <base-checkbox v-model="authForm.save">Запомнить аккаунт</base-checkbox>

          <base-button
            class="auth-page__button"
            :disabled="isDisabled"
            @click="signInHandler(authForm, authForm.save)"
          >
            Войти
          </base-button>
        </div>
      </div>

      <div v-else class="auth-page__users">
        <div class="auth-page__users-content">
          <div class="auth-page__users-header">
            <img src="public/logo.svg" alt="logo" class="auth-page__logo" />
            <div class="auth-page__users-title">Вход в ERP-систему</div>

            <div class="auth-page__users-info">
              <span class="auth-page__users-text">C возвращением!</span>

              <img src="public/emoji.svg" alt="emoji" />
            </div>
          </div>

          <notificate-message v-if="isShowNotificate" :status="notificateStatus">{{
            notificateMessage
          }}</notificate-message>

          <div class="auth-page__users-wrapper">
            <base-row @click="addUser" class="auth-page__new-user">
              <template #base-row-avatar>
                <plus-icon></plus-icon>
              </template>

              <template #default> Добавить пользователя</template>
            </base-row>

            <div class="auth-page__users-list">
              <user-row
                v-for="user in users"
                :key="user.id"
                v-bind="user"
                class="auth-page__user"
                @sign-in="
                  password => signInHandler({ login: user.login, tabel: user.tabel, password })
                "
                @close="hideNotificate"
                @open="hideNotificate"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="isShowPagination" class="auth-page__pagination">
        <div class="auth-page__bullet" :class="{ 'auth-page__bullet_active': !isFullAuth }"></div>
        <div class="auth-page__bullet" :class="{ 'auth-page__bullet_active': isFullAuth }"></div>
      </div>
    </div>
  </page-block>
</template>

<script setup lang="ts">
import NotificateMessage from "components/notificate-message.vue";
import BaseRow from "components/shared/base-row.vue";
import ArrowLeftIcon from "components/shared/icons/arrow-left-icon.vue";
import PlusIcon from "components/shared/icons/plus-icon.vue";
import PageBlock from "components/shared/page-block.vue";
import BaseButton from "components/shared/ui/button/base-button.vue";
import BaseCheckbox from "components/shared/ui/checkbox/base-checkbox.vue";
import PasswordInput from "components/shared/ui/input/password-input.vue";
import BaseSelect from "components/shared/ui/select/base-select.vue";

import type { IOption } from "components/shared/ui/select/types";
import UserRow from "components/user-row.vue";
import isError from "src/helpers/guards/is-error";
import type { IAccessToken, ISignInForm, IUser } from "src/types";
import useUser from "use/useAuth";
import { computed, onMounted, ref, watch } from "vue";

const tabelOptions = ref<IOption<string>[]>([]);
const setTabelOptions = (users: IUser[]) => {
  tabelOptions.value = users.map(user => ({ name: user.tabel, value: user.tabel }));
};

const isDisabled = computed(
  () => !authForm.value.login || !authForm.value.tabel || !authForm.value.password,
);

const loginOptions = ref<IOption<string>[]>([]);
const setLoginOptions = (users: IUser[]) => {
  loginOptions.value = users.map(user => ({ name: user.login, value: user.login }));
};

const { users, signIn, signInWithSave, getUsers } = useUser();

const isExistUsers = computed(() => (users.value.length ? true : false));
const isFullAuth = ref(!isExistUsers.value);

watch(isFullAuth, () => {
  if (isFullAuth.value === true) {
    hideNotificate();
  }
});

const isShowPagination = computed(() => (isExistUsers.value ? true : false));

const authForm = ref<{ login: string; tabel: string; password: string; save: boolean }>({
  login: "",
  tabel: "",
  password: "",
  save: false,
});

const resetForm = () => {
  authForm.value.login = "";
  authForm.value.tabel = "";
  authForm.value.password = "";
  authForm.value.save = false;
};

const signInHandler = async (form: ISignInForm, save: boolean = false) => {
  let response: IAccessToken | Error | null = null;

  if (save) {
    response = await signInWithSave(form);
  } else {
    response = await signIn(form);
  }

  if (response && !isError(response)) {
    isFullAuth.value = false;
    showSuccess("Пользователь успешно авторизован");
    resetForm();
  } else {
    notificateMessage.value = response.message;
    showError(response.message);
  }
};

const addUser = () => {
  isFullAuth.value = true;
};

const toUsers = () => {
  isFullAuth.value = false;
};

const notificateMessage = ref<string>("Ошибка");
const notificateStatus = ref<"error" | "success">("error");
const isShowNotificate = ref<boolean>(false);

const hideNotificate = () => {
  isShowNotificate.value = false;
};

const showNotificate = () => {
  isShowNotificate.value = true;
};

const decoratorNotificate = <T extends (message: string) => ReturnType<T>>(calle: T) => {
  return (message: string) => {
    notificateMessage.value = message;
    const result = calle(message);
    showNotificate();

    return result;
  };
};
const setSuccessNotificate = () => {
  notificateStatus.value = "success";
};

const setErrorNotificate = () => {
  notificateStatus.value = "error";
};

const showSuccess = decoratorNotificate(setSuccessNotificate);
const showError = decoratorNotificate(setErrorNotificate);

onMounted(async () => {
  const users = await getUsers();

  setLoginOptions(users);
  setTabelOptions(users);
});
</script>

<style scoped lang="scss">
.auth-page {
  max-height: 100vh;
  &__content {
    position: relative;
    padding: 70px 50px 110px 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 50px;

    background-color: var(--white);

    border-radius: 24px;
  }

  &__header {
    position: absolute;
    top: 45px;
    left: 50px;
    right: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__auth {
    max-width: 460px;
    width: 100%;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  &__title {
    font-size: 30px;
    line-height: 36px;
  }

  &__select {
  }

  &__button {
    height: 56px;
  }

  &__users {
    max-width: 725px;
    width: 100%;
    height: 100%;

    border-radius: 25px;

    padding: 40px;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;

    color: var(--white);

    background-image: linear-gradient(220deg, #a1c2ff 0%, #75a3fb 30%, #4781ee 100%);
  }

  &__users-content {
    width: 100%;
    max-width: 470px;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__users-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;

    font-size: 24px;
    line-height: 29px;
    font-weight: 700;
  }

  &__logo {
  }

  &__users-title {
  }

  &__users-info {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    font-size: 40px;
    line-height: 48px;
    font-weight: 600;
  }

  &__users-text {
  }

  &__users-wrapper,
  &__users-list {
    display: flex;
    flex-direction: column;
    gap: 20px;

    overflow: hidden;
  }

  &__users-list {
    overflow-y: auto;
  }

  &__user {
  }

  &__pagination {
    position: absolute;
    bottom: 70px;
    display: flex;
    gap: 10px;
  }

  &__bullet {
    --w: 11px;

    width: var(--w);
    height: var(--w);

    border-radius: 50%;

    background-color: var(--border-color);

    &_active {
      background-color: var(--primary-light-color);
    }
  }
}
</style>
