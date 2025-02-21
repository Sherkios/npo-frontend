<template>
  <div class="base-row">
    <div class="base-row__main">
      <div class="base-row__avatar">
        <slot name="base-row-avatar"></slot>
      </div>

      <div class="base-row__info">
        <slot></slot>
      </div>
    </div>

    <div v-if="$slots['base-row-additional']" class="base-row__additional">
      <slot name="base-row-additional"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "base-row",
});
</script>

<style lang="scss">
.base-row {
  padding: 15px 25px;

  background-color: var(--white-50);
  backdrop-filter: blur(30px);

  border-radius: 20px;

  cursor: pointer;

  &__main {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__avatar {
    --w: 60px;
    width: var(--w);
    height: var(--w);
    border-radius: 50%;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--white);
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    color: #677074;
  }
}
</style>
