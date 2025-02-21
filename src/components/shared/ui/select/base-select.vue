<template>
  <input-field class="base-select" :class="baseSelectClass">
    <template v-if="$slots['default']" #title><slot></slot></template>

    <template #default>
      <div ref="select-content" class="base-select__content">
        <div class="base-select__main" @click="changeActiveState(!isOpen)">
          <div class="base-select__name">{{ currentName }}</div>
        </div>

        <div class="base-select__options">
          <template v-for="(item, idx) in options" :key="idx">
            <div
              v-if="'name' in item"
              class="base-select__option"
              :class="{ 'base-select__option_current': item.value === model }"
              @click="choseOption(item.value)"
            >
              {{ item.name }}
            </div>
          </template>
        </div>
      </div>
    </template>
  </input-field>
</template>

<script setup lang="ts" generic="option">
import InputField from "components/shared/ui/input-field.vue";
import type { IOption } from "components/shared/ui/select/types";
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from "vue";

defineOptions({
  name: "base-select",
});

const props = withDefaults(
  defineProps<{
    options: IOption<option>[];
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    placeholder: "Значение не выбрано",
    disabled: false,
  },
);

const baseSelectClass = computed(() => [
  { "base-select_active": isOpen.value, "base-select_placeholder": isPlacholder.value },
]);

const model = defineModel();

const isOpen = ref<boolean>(false);

const isPlacholder = computed(() => model.value === undefined || model.value === "");
const currentName = computed((): string => {
  let element: IOption<option> | undefined;

  for (const item of props.options) {
    if (item.value === model.value) {
      element = item;
      break;
    }
  }

  if (element) {
    return element.name;
  } else {
    return props.placeholder;
  }
});

const contentRef = useTemplateRef("select-content");

const choseOption = (value: option): void => {
  for (const item of props.options) {
    if (item.value === value) {
      model.value = value;
    }
  }

  changeActiveState(false);
};

const changeActiveState = (state: boolean): void => {
  if (props.disabled && state) {
    return;
  }

  isOpen.value = state;
};

const closeSelect = (event: Event): void => {
  const target: HTMLElement = event.target as HTMLElement;
  const parent: HTMLElement | null = target.closest(".base-select__content");

  if (isOpen.value && parent !== contentRef.value) {
    changeActiveState(false);
  }
};

onMounted(() => {
  document.documentElement.addEventListener("click", closeSelect);
});

onUnmounted(() => {
  document.documentElement.removeEventListener("click", closeSelect);
});
</script>

<style lang="scss">
.base-select {
  // width: 100%;

  display: flex;
  flex-direction: column;
  gap: 4px;

  color: var(--text-foregound-color);

  &_active {
    --select-border-color: var(--accent-color);
    & .base-select__options {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }

  &_placeholder {
    --select-color: var(--select-placeholder-color);
  }

  &__title {
    color: var(--secondary);
  }

  &__content {
    position: relative;
    width: 100%;
  }

  &__main {
    position: relative;
    width: 100%;
    min-height: 1lh;

    padding: var(--select-main-padding);

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    border: 1px solid var(--select-border-color);
    border-radius: 12px;

    background-color: var(--select-background-color);

    transition: all 0.5s ease;

    line-height: 24px;

    cursor: pointer;

    font-size: 16px;
    line-height: 24px;
  }

  &__name {
    color: var(--select-color);
    min-height: 1lh;
  }

  &__options {
    position: absolute;
    z-index: 10;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    max-height: 40vh;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 5px;

    padding: 10px;

    border: 1px solid var(--select-border-color);
    border-radius: 6px;

    background-color: var(--white);

    opacity: 0;
    visibility: hidden;

    transform: translateY(-5px);

    transition: all 0.3s ease;

    overflow: auto;
  }

  &__option {
    display: flex;
    gap: 4px;
    align-items: center;

    padding: 6px 5px;
    color: var(--option-color);
    background-color: var(--option-background-color);

    transition: all 0.2s ease;

    font-size: 14px;
    line-height: 17px;

    border-radius: 6px;

    cursor: pointer;

    &:hover {
      --option-color: var(--option-hover-color);
      --option-background-color: var(--accent-hover-color);
    }

    &_current {
      --option-color: var(--option-current-color);
      // background-color: var(--option-current-background-color);

      &:hover {
        --option-color: var(--option-current-color);
      }
    }
  }
}
</style>
