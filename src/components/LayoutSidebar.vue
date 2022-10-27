<script>
export default {
  props: {
    align: String,
    gap: String,
    customClass: String
  },
  data() {
    const styles = {};
    const classes = {};

    if (this.align) {
      styles["--sb-align"] = this.align;
    }

    if (this.gap) {
      styles["--sb-gap"] = this.gap;
    }

    if(this.customClass) {
      classes[this.customClass] = this.customClass;
    }

    return {
      styleObject: styles,
      classObject: classes
    };
  },
};
</script> 
<template>
  <div class="l-sidebar" :style="styleObject" :class="classObject">
    <slot />
  </div>
</template>

<style>
  .l-sidebar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sb-gap, var(--s0));
    align-items: var(--sb-align, flex-start);
  }
</style>
