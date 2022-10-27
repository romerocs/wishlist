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
  <a class="button" v-bind:href="url">
    <slot />
  </a>
</template>

<style>
.button {
  border-radius: var(--border-radius-4x);
  line-height: 1;
  text-decoration: none;
  display: inline-block;
  padding: 6px 24px;
  background-color: v-bind(bgColor);
}
</style>
