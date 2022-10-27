<script>
export default {
  props: {
    maxWidth: String,
    padding: String,
  },
  data() {
    const styles = {};

    if(this.maxWidth) {
      styles['--cr-max-width'] = this.maxWidth;
    }

    if(this.padding) {
      styles['--cr-padding'] = this.padding;
    }
    
    return {
      styleObject: styles
    };
  },
};
</script>
<template>
  <div class="l-center" :style="styleObject">
    <slot />
  </div>
</template>

<style>
.l-center {
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: var(--cr-max-width, var(--bp-64));
  display: flex;
  flex-direction: column;
  padding-right: var(--cr-padding, 0);
  padding-left: var(--cr-padding, 0);
}
</style>
