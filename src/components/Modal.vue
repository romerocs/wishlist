<script>
import SVGClose from './SVGClose.vue';
import LayoutStack from './LayoutStack.vue';

export default {
  components: {
    SVGClose,
    LayoutStack
  },
  methods: {
    closeHandler(e) {
      this.$refs.dialog.close();
    }
  },
};
</script>
<template>
  <dialog ref="dialog">
    <LayoutStack gap="var(--s2)">

      <button class="close" @click="closeHandler"><SVGClose /></button>
      <slot />
    </LayoutStack>
  </dialog>
</template>

<style>
  .close {
    color: var(--hotpink-70);
    line-height: 0;
    margin-left: auto;
  }
</style>
