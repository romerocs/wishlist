<script>
export default {
    props: {
        bgColor: {
            type: String,
            default: 'transparent'
        },
        url: String
    }
};
</script>
<template>
  <a class="button" v-bind:href="url">
    <slot />
  </a>
</template>

<style lang="scss">
  @use "../styles/4-components/Button";
</style>