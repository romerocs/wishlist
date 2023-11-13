<script>
import SVGTrash from "./SVGTrash.vue";
import ActionItem from "./ActionItem.vue";

export default {
  emits: ["delete"],
  components: {
    SVGTrash,
    ActionItem,
  }
};
</script>
<template>
  <ActionItem class="delete">
    <button aria-label="Delete">
      <SVGTrash />
    </button>
  </ActionItem>
</template>