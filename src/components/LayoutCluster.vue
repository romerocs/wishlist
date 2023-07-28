<script>
export default {
  props: {
    justify: String,
    padding: String,
    gap: String
  },
  data() {
    const styles = {};

    if (this.justify) {
      styles["--cl-justify"] = this.justify;
    }

    if (this.padding) {
      styles["--cl-padding"] = this.padding;
    }

    if (this.gap) {
      styles["--cl-gap"] = this.gap;
    }

    return {
      styleObject: styles,
    };
  },
};
</script>
<template>
  <div class="l-cluster" :style="styleObject">
    <slot />
  </div>
</template>

<style>
  .l-cluster {
    display: flex;
    flex-wrap: wrap;
    justify-content: var(--cl-justify, flex-start);
    align-items: var(--cl-align, center);
    gap: var(--cl-gap, var(--s0));
  }
</style>
