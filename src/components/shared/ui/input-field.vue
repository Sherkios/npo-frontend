<template>
  <div class="input-field">
    <div class="input-field__header" v-if="isShowHeader">
      <p v-if="isShowHeader" class="input-field__title">
        <slot name="title"></slot>
      </p>

      <template v-if="$slots['input-field-right']">
        <slot name="input-field-right"></slot>
      </template>
    </div>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

defineOptions({
  name: "input-field",
});

const slots = useSlots() as Partial<Record<string, Function>>;

const isShowHeader = computed(() => slots.title || slots["input-field-right"]);
</script>

<style lang="scss" scoped>
.input-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    color: var(--subtext-color);
    font-size: 16px;
    line-height: 20px;

    transition: all 0.5s ease;
  }
}
</style>
