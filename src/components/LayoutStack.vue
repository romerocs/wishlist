<script>
export default {
  props: {
    gap: {
      type: String,
      default: "var(--vertical-rhythm)"
    },
  }
};
</script>
<template>
  <div class="l-stack">
    <slot />
  </div>
</template>

<style>
.l-stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: v-bind(gap);
}
</style>
