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
  display: block;
  position: fixed;
  width: 100%;
  z-index: 99999999;
  background-color: var(--white);
  top: 0;
  left: auto;
  right: 0;
  height: 100%;
  max-height: 100%;
  overflow-y: scroll;
  max-width: 23.4375rem;
  transform: translateX(100%);
  transition: transform 470ms cubic-bezier(0.16, 0.57, 0.34, 1.00);
}

dialog[open] {
  transform: translateX(0);

}

dialog::backdrop {
  background: rgb(0 0 0);
  backdrop-filter: blur(4px);
  animation: fadeIn 470ms linear forwards;
}

.close {
  color: var(--hotpink-70);
  line-height: 0;
  margin-left: auto;
}

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }
</style>
