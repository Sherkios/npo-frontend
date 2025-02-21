<template>
  <label class="base-checkbox">
    <input v-model="model" class="base-checkbox__checkbox" type="checkbox" />
    <div class="base-checkbox__label"><slot></slot></div>
  </label>
</template>

<script setup lang="ts">
defineOptions({
  name: "base-checkbox",
});

const model = defineModel<boolean>();
</script>

<style scoped lang="scss">
.base-checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;

  cursor: pointer;
  &__checkbox {
    appearance: none;
    position: relative;

    --w: 24px;
    width: var(--w);
    height: var(--w);

    background-color: var(--white);
    border: 1px solid var(--checkbox-border-color);
    border-radius: 4px;

    transition: all 0.2s ease;

    &::after {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      content: "";
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("public/approve.svg");
    }

    &:checked {
      background-color: var(--primary-light-color);
      --checkbox-border-color: var(--primary-light-color);
    }
  }

  &__label {
    color: var(--placeholder-color);
    font-size: 18px;
    line-height: 22px;
  }
}
</style>
