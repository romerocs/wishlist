<script>
export default {
  props: {
    gap: String
  },
  data() {
    const styles = {};

    if (this.gap) {
      styles["--st-gap"] = this.gap;
    }

    return {
      styleObject: styles,
    };
  },
};
</script>
<template>
  <div class="l-stack" :style="styleObject">
    <slot />
  </div>
</template>

<style>
  .l-stack {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: var(--st-gap, var(--s0));
  }
</style>
