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
      this.$refs.pane.close();
    }
  },
};
</script>

<template>
  <dialog class="pane" ref="pane">
    <LayoutStack gap="var(--s2)">

      <button class="close" @click="closeHandler"><SVGClose /></button>
      <slot />
    </LayoutStack>
  </dialog>
</template>

<style scoped lang="scss">
body:has(.pane[open]) {
  overflow: hidden;
  padding-right: 15px;
}

dialog {
  position: fixed;
  width: 100%;
  z-index: 99999999;
  //transition: transform var(--oc-transition-duration, 200ms) ease-out;
  background-color: var(--white);
  top: 0;
  left: auto;
  right: 0;
  height: 100%;
  max-height: 100%;
  overflow-y: scroll;
  max-width: 23.4375rem;
  transform: translateX(100%);
}

dialog[open] {
  transform: translateX(0);
}

dialog::backdrop {
  background: rgb(0 0 0 / 0.5);
  backdrop-filter: blur(4px);
}

</style>
