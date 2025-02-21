<template>
  <button class="base-button" :class="buttonClass" :disabled>
    <template v-if="$slots['base-button-left']">
      <slot name="base-button-left"></slot>
    </template>

    <template v-if="!isLoading">
      <slot></slot>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "base-button",
});

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    isLoading?: boolean;
    buttonType?: "primary" | "secondary";
  }>(),
  {
    disabled: false,
    isLoading: false,
    buttonType: "primary",
  },
);

const buttonClass = computed(() => [
  {
    "base-button_primary": props.buttonType === "primary",
    "base-button_secondary": props.buttonType === "secondary",
  },
]);
</script>

<style lang="scss">
.base-button {
  --icon-fill: var(--button-color);
  --icon-stroke: var(--button-color);

  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;

  padding-left: 12px;
  padding-right: 12px;

  gap: 10px;

  color: var(--button-color);
  background-color: var(--button-background-color);

  border: none;
  border-radius: 10px;

  cursor: pointer;

  font-size: 20px;
  line-height: 24px;


  transition: all 0.2s ease;


  &:disabled {
    --button-color: var(--subtext-color);
    --button-background-color: var(--secondary-color)
    cursor: default;
  }

  &:hover, &:active {
    --button-background-color: var(--primary-color);
  }

  &_secondary {
    --button-color: var(--text-color);
    --button-background-color: transparent;

    &:hover {
      --button-background-color: var(--secondary-background-color);
    }

    &:active {
      --button-color: var(--primary-light-color);
      --button-background-color: var(--primary-background-color);
    }


  }

  &__loader {
    height: 2em;
    width: 100%;
  }
}
</style>
