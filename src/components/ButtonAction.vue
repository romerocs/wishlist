<script>
export default {
  props: {
    label: String
  }
};
</script>
<template>
  <button class="btn-action" :aria-label="label">
    <slot />
  </button>
</template>

<style lang="scss">
.btn-action {
  border: 1px solid var(--color-hollow-button-border);
  border-radius: var(--border-radius-button);
  width: 22px;
  aspect-ratio: 1 / 1;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
