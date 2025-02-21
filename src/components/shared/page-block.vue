<template>
  <div class="page-block">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "page-block",
});
</script>

<style scoped lang="scss">
.page-block {
  min-height: 100vh;
  padding: 55px;

  display: flex;

  & > * {
    width: 100%;
  }
}
</style>
