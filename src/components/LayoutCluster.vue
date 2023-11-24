<script>
export default {
  props: {
    justify: String,
    align: String,
    padding: String,
    gap: String
  },
  data() {
    return {
      _align: this.align ? this.align : 'center',
      _justify: this.justify ? this.justify : 'flex-start',
      _gap: this.gap ? this.gap : 'var(--s0)',
      _padding: this.justify ? this.justify : 'flex-start',
    };


  },
};
</script>
<template>
  <div class="l-cluster">
    <slot />
  </div>
</template>

<style>
  .l-cluster {
    display: flex;
    flex-wrap: wrap;
    justify-content: v-bind(_justify);
    align-items: v-bind(_align);
    gap: v-bind(_gap);
  }
</style>
