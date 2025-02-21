<template>
  <base-input v-model="model" placeholder="Введите пароль" :type class="password-input">
    <template #default><slot>Пароль</slot></template>

    <template #base-input-right>
      <template v-if="!isShowPassword">
        <eye-off-icon class="password-input__icon" @click="changeType"></eye-off-icon>
      </template>

      <template v-else>
        <eye-icon class="password-input__icon" @click="changeType"></eye-icon>
      </template>
    </template>
  </base-input>
</template>

<script setup lang="ts">
import EyeIcon from "components/shared/icons/eye-icon.vue";
import EyeOffIcon from "components/shared/icons/eye-off-icon.vue";
import BaseInput from "components/shared/ui/input/base-input.vue";
import type { IBaseInputProps, TInputType } from "components/shared/ui/input/types";
import { computed, ref } from "vue";

defineOptions({
  name: "password-input",
});

defineProps<Omit<IBaseInputProps, "type">>();

const model = defineModel<string>();

const type = computed<TInputType>(() => (isShowPassword.value ? "text" : "password"));
const isShowPassword = ref<boolean>(false);

const changeType = () => {
  isShowPassword.value = !isShowPassword.value;
};
</script>

<style scoped lang="scss">
.password-input {
  &__icon {
    cursor: pointer;
  }
}
</style>
