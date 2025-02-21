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

          <div class="auth-page__form">
            <base-select
              v-model="authForm.tabel"
              :options
              placeholder="Введите табельный номер"
              class="auth-page__select"
            >
              Табельный номер
            </base-select>

            <base-select
              v-model="authForm.login"
              :options
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

          <base-button class="auth-page__button" @click="signInHandler">Войти</base-button>
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

          <div class="auth-page__users-list">
            <base-row @click="addUser">
              <template #base-row-avatar>
                <plus-icon></plus-icon>
              </template>

              <template #default> Добавить пользователя</template>
            </base-row>

            <user-row
              v-for="user in users"
              :key="user.id"
              v-bind="user"
              class="auth-page__user"
              @sign-in="password => signIn({ login: user.login, tabel: user.tabel, password })"
            />
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
import useUser from "use/useAuth";
import { computed, ref } from "vue";

const options = ref<IOption<number>[]>([
  {
    name: "Option 1",
    value: 1,
  },
  {
    name: "Option 2",
    value: 2,
  },
  {
    name: "Option 3",
    value: 3,
  },
]);

const { users, signIn, signInWithSave } = useUser();

const isExistUsers = computed(() => (users.value.length ? true : false));
const isFullAuth = ref(!isExistUsers.value);

const isShowPagination = computed(() => (isExistUsers.value ? true : false));

const authForm = ref<{ login: string; tabel: string; password: string; save: boolean }>({
  login: "",
  tabel: "",
  password: "",
  save: false,
});

const signInHandler = () => {
  const { save, ...form } = authForm.value;

  if (save) {
    signInWithSave(form);
  } else {
    signIn(form);
  }

  isFullAuth.value = false;
};

const addUser = () => {
  isFullAuth.value = true;
};

const toUsers = () => {
  isFullAuth.value = false;
};
</script>

<style scoped lang="scss">
.auth-page {
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

  &__users-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
