<template>
  <svg
    class="plus-icon"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.0069 6.66699V25.3337"
      stroke="#677074"
      stroke-width="2.64445"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.67035 15.9995H25.337"
      stroke="#677074"
      stroke-width="2.64445"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
defineOptions({
  name: "plus-icon",
});
</script>

<style scoped lang="scss">
.plus-icon {
  & path {
    stroke: var(--icon-stroke);
  }
}
</style>
