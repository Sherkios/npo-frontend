<template>
  <div class="notificate-message" :class="notificateClass">
    <div class="notificate-message__message"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "notificate-message",
});

const props = withDefaults(
  defineProps<{
    status?: "error" | "success";
  }>(),
  {
    status: "success",
  },
);

const notificateClass = computed(() => [
  {
    "notificate-message_error": props.status === "error",
  },
]);
</script>

<style scoped lang="scss">
.notificate-message {
  --color: var(--positive-color);
  padding: 12px;

  border-radius: 12px;
  border: 1px solid var(--color);
  color: var(--color);

  background-color: var(--background-color);

  &_error {
    --color: var(--negative-color);
  }
  &__message {
    text-align: center;
  }
}
</style>
