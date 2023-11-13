<script>
import SVGPencil from "./SVGPencil.vue";
import ActionItem from "./ActionItem.vue";

export default {
  emits: ["delete"],
  components: {
    SVGPencil,
    ActionItem,
  }
};
</script>
<template>
  <ActionItem class="edit">
    <button aria-label="Edit">
      <SVGPencil />
    </button>
  </ActionItem>
</template>
