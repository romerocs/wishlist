<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: 'transparent'
    },
    url: String
  },
};
</script>
<template>
  <button class="button" v-bind:href="url">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  @use "../styles/4-components/button";
</style>