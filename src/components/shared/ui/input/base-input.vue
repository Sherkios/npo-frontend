<template>
  <input-field class="base-input">
    <template v-if="$slots['default']" #title><slot></slot></template>

    <template v-if="$slots['base-input-right']" #input-field-right>
      <slot name="base-input-right"></slot>
    </template>

    <input v-model="model" class="base-input__input" :type :placeholder />
  </input-field>
</template>

<script setup lang="ts">
import InputField from "components/shared/ui/input-field.vue";
import type { IBaseInputProps } from "components/shared/ui/input/types";

defineOptions({
  name: "base-input",
});

withDefaults(defineProps<IBaseInputProps>(), {
  type: "text",
  placeholder: "",
});

const model = defineModel<string>();
</script>

<style scoped lang="scss">
.base-input {
  &__input {
    appearance: none;

    width: 100%;

    padding: var(--input-padding);

    border-radius: 12px;
    border: 1px solid var(--input-border-color);

    outline: none;

    font-size: 16px;
    line-height: 24px;

    &::placeholder {
      color: var(--input-placeholder-color);
    }
  }
}
</style>
