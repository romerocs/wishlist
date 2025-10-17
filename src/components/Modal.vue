<script>
import SVGClose from './SVGClose.vue';
import LayoutStack from './LayoutStack.vue';

export default {
  props: {
    type: 'modal' | 'pane'
  },
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

<style scoped lang="scss">
dialog {
  border-radius: var(--border-radius-1x);
  padding: var(--s3);
  position: absolute;
  
  &::backdrop {
    background: black;
  }
  
  &[open] {
    opacity: 1;
    translate: 0 0;
    transition: 
      display 300ms linear allow-discrete, 
      overlay 300ms linear allow-discrete, 
      translate 350ms cubic-bezier(0.186, 0.525, 0.191, 0.964) allow-discrete,
      opacity 250ms linear;

    &::backdrop {
      opacity: .75;
    }
  }
  
  @starting-style {
    &[open],
    &[open] {
      opacity: 0.5;
      translate: 0 20px;
    }
  }
}

  .close {
    color: var(--hotpink-70);
    line-height: 0;
    margin-left: auto;
  }
</style>
