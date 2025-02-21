<template>
  <base-row ref="row" class="user-row" :class="rowClass" @click="openRow">
    <template #base-row-avatar>
      <img :src="img" alt="name" />
    </template>

    <template #default>
      <div class="user-row__info">
        <div class="user-row__name">{{ login }}</div>
        <div class="user-row__tabel">{{ tabel }}</div>
      </div>
    </template>

    <template v-if="isFull" #base-row-additional>
      <div class="user-row__form">
        <password-input v-model="password"></password-input>
        <base-button class="user-row__button" @click="signIn">Войти</base-button>
      </div>
    </template>
  </base-row>
</template>

<script setup lang="ts">
import BaseRow from "components/shared/base-row.vue";
import BaseButton from "components/shared/ui/button/base-button.vue";
import PasswordInput from "components/shared/ui/input/password-input.vue";
import type { IUserRow } from "src/types";

import { computed, onMounted, onUnmounted, ref, useTemplateRef } from "vue";

defineOptions({
  name: "user-row",
});

defineProps<IUserRow>();

const refRow = useTemplateRef("row");

const isFull = ref<boolean>(false);

const rowClass = computed(() => [{ "user-row_full": isFull.value }]);

const password = ref<string>("");

const emit = defineEmits<{
  (e: "sign-in", password: string): void;
}>();

const signIn = () => {
  emit("sign-in", password.value);
};

const openRow = () => {
  if (!isFull.value) isFull.value = true;
};

const closeRow = (e: Event) => {
  const target = e.target as HTMLElement;
  const parent: HTMLElement | null = target.closest(".user-row");

  password.value = "";

  if (target.namespaceURI === "http://www.w3.org/2000/svg") return;

  if (isFull.value && parent !== refRow.value?.$el) isFull.value = false;
};

onMounted(() => {
  document.documentElement.addEventListener("click", closeRow);
});

onUnmounted(() => {
  document.documentElement.removeEventListener("click", closeRow);
});
</script>

<style scoped lang="scss">
.user-row {
  --input-border-color: transparent;

  display: flex;
  flex-direction: column;
  gap: 15px;

  cursor: pointer;

  &_full {
    cursor: initial;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  &__name {
    color: var(--text-color);
  }

  &__tabel {
    color: #757d8a;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-top: 15px;

    border-top: 1px solid var(--primary-light-color);
  }

  &__button {
    height: 56px;
  }
}
</style>
