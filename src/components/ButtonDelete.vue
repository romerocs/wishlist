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
  <ActionItem>
    <button aria-label="Delete">
      <SVGTrash />
    </button>
  </ActionItem>
</template>
