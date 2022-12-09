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
  padding: var(--s-3) var(--s2);
  background-color: v-bind(bgColor);
  color: var(--white);
  text-transform: uppercase;
  font-weight: 600;
  font-size: var(--s-1);
}
</style>
